interface Product {
  nom: string;
  genere: string;
  any: number;
  tipus: string;
  director?: string;
  plataforma?: string;
}

class Client {
  constructor(
    public nom: string,
    public dataNaixement: string,
    public email: string,
    public generes: string[],
    public peliculaPreferida?: string
  ) {}

  static fromURLParams(params: URLSearchParams): Client {
    return new Client(
      params.get("nom")!,
      params.get("dataNaixement")!,
      params.get("email")!,
      params.getAll("generes"),
      params.get("pelicula") || undefined
    );
  }

  static loadFromLocalStorage(): Client[] {
    return JSON.parse(localStorage.getItem("clients") || "[]");
  }

  static saveToLocalStorage(clients: Client[]): void {
    localStorage.setItem("clients", JSON.stringify(clients));
  }
}

class ProductManager {
  static loadProducts(type: "pelicules" | "videojocs"): Product[] {
    const defaultData = {
      pelicules: [
        {
          nom: "Inception",
          genere: "Ciència-ficció",
          any: 2010,
          tipus: "Pel·licula",
          director: "Christopher Nolan"
        },
        {
          nom: "The Godfather",
          genere: "Drama",
          any: 1972,
          tipus: "Pel·licula",
          director: "Francis Ford Coppola"
        }
      ],
      videojocs: [
        {
          nom: "The Legend of Zelda: Breath of the Wild",
          genere: "Aventura",
          any: 2017,
          tipus: "Videojoc",
          plataforma: "Nintendo Switch"
        },
        {
          nom: "Red Dead Redemption 2",
          genere: "Acció-Aventura",
          any: 2018,
          tipus: "Videojoc",
          plataforma: "Multiplataforma"
        }
      ]
    };
    
    return JSON.parse(localStorage.getItem(type) || JSON.stringify(defaultData[type]));
  }

  static saveProducts(type: "pelicules" | "videojocs", products: Product[]): void {
    localStorage.setItem(type, JSON.stringify(products));
  }
}

// Inicializar productos desde LocalStorage
let movies: Product[] = ProductManager.loadProducts("pelicules");
let games: Product[] = ProductManager.loadProducts("videojocs");

// Función para mostrar clientes
function mostrarClients(clients: Client[]): void {
  const clientList = document.getElementById("clientList");
  if (!clientList) return;

  clientList.innerHTML = clients
    .map(client => `<li>${client.nom} - ${client.email}</li>`)
    .join("");
}

// Sistema de notificaciones
function mostrarMissatge(message: string, type: "error" | "success" = "error"): void {
  const missatgeDiv = document.createElement("div");
  missatgeDiv.className = `missatge ${type}`;
  missatgeDiv.textContent = message;
  
  document.body.prepend(missatgeDiv);
  setTimeout(() => missatgeDiv.remove(), 3000);
}


function afegirProducte(productName?: string, platform?: string): void {
  const input = document.getElementById("itemInput") as HTMLInputElement;
  const value = productName ? `${productName}${platform ? `,${platform}` : ""}` : input.value.trim();
  input.value = "";

  if (value.includes(",")) {
    // Handle Videojoc
    const [gameName, gamePlatform] = value.split(",").map(v => v.trim());
    if (gameName && gamePlatform) {
      const newGame: Product = {
        nom: gameName,
        genere: "Unknown", // Default genre
        any: new Date().getFullYear(), // Current year as default
        tipus: "Videojoc",
        plataforma: gamePlatform
      };
      games.push(newGame);
      ProductManager.saveProducts("videojocs", games);
    }
  } else if (value) {
    // Handle Pel·licula
    const newMovie: Product = {
      nom: value,
      genere: "Unknown", // Default genre
      any: new Date().getFullYear(), // Current year as default
      tipus: "Pel·licula",
      director: "" // Optional field
    };
    movies.push(newMovie);
    ProductManager.saveProducts("pelicules", movies);
  }
}

function escriureTaula(titol: string, objectes: Product[], objectes2?: Product[]) {
  const tableContainer = document.getElementById("tableContainer")!;
  tableContainer.innerHTML = "";

  const table = document.createElement("table");
  const header = document.createElement("tr");
  header.innerHTML = objectes2 ? "<th>Pel·lícules</th><th>Videojocs</th>" : `<th>${titol}</th>`;
  table.appendChild(header);

  const maxLength = Math.max(objectes.length, objectes2?.length || 0);

  for (let i = 0; i < maxLength; i++) {
    const row = document.createElement("tr");
    if (objectes2) {
      const movie = objectes[i];
      const game = objectes2[i];
      row.innerHTML = `
        <td>${movie?.nom || ""}${movie?.director ? ` (Dir. ${movie.director})` : ""}</td>
        <td>${game?.nom || ""}${game?.plataforma ? ` (${game.plataforma})` : ""}</td>
      `;
    } else {
      const product = objectes[i];
      row.innerHTML = `<td>${product?.nom || ""}</td>`;
    }
    table.appendChild(row);
  }

  tableContainer.appendChild(table);
}

function mostrarDades(tipus?: string): void {
  switch (tipus) {
    case "Pel·licules":
      escriureTaula(tipus, movies);
      break;
    case "Videojocs":
      escriureTaula(tipus, games);
      break;
    default:
      escriureTaula("Tots els Productes", movies, games);
      break;
  }
}

// Carga inicial
document.addEventListener("DOMContentLoaded", () => {
  // Cargar clientes
  const clients = Client.loadFromLocalStorage();
  const params = new URLSearchParams(window.location.search);

  if (params.has("nom")) {
    try {
      const newClient = Client.fromURLParams(params);
      const emailExists = clients.some(c => c.email.toLowerCase() === newClient.email.toLowerCase());
      
      if (!emailExists) {
        clients.push(newClient);
        Client.saveToLocalStorage(clients);
      } else {
        mostrarMissatge("Aquest correu electrònic ja està registrat!");
      }
    } catch (error) {
      mostrarMissatge("Error en processar el nou client");
    }
  }

  mostrarClients(clients);
  const ultimFiltre = localStorage.getItem("ultimFiltre") as "Pel·licules" | "Videojocs" | "all" || "all";
  mostrarDades(ultimFiltre === "all" ? undefined : ultimFiltre);
});