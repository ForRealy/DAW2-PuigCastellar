"use strict";
class Client {
    constructor(nom, dataNaixement, email, generes, peliculaPreferida) {
        this.nom = nom;
        this.dataNaixement = dataNaixement;
        this.email = email;
        this.generes = generes;
        this.peliculaPreferida = peliculaPreferida;
    }
    static fromURLParams(params) {
        return new Client(params.get("nom"), params.get("dataNaixement"), params.get("email"), params.getAll("generes"), params.get("pelicula") || undefined);
    }
    static loadFromLocalStorage() {
        return JSON.parse(localStorage.getItem("clients") || "[]");
    }
    static saveToLocalStorage(clients) {
        localStorage.setItem("clients", JSON.stringify(clients));
    }
}
class ProductManager {
    static loadProducts(type) {
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
    static saveProducts(type, products) {
        localStorage.setItem(type, JSON.stringify(products));
    }
}
// Inicializar productos desde LocalStorage
let movies = ProductManager.loadProducts("pelicules");
let games = ProductManager.loadProducts("videojocs");
// Función para mostrar clientes
function mostrarClients(clients) {
    const clientList = document.getElementById("clientList");
    if (!clientList)
        return;
    clientList.innerHTML = clients
        .map(client => `<li>${client.nom} - ${client.email}</li>`)
        .join("");
}
// Sistema de notificaciones
function mostrarMissatge(message, type = "error") {
    const missatgeDiv = document.createElement("div");
    missatgeDiv.className = `missatge ${type}`;
    missatgeDiv.textContent = message;
    document.body.prepend(missatgeDiv);
    setTimeout(() => missatgeDiv.remove(), 3000);
}
function afegirProducte(productName, platform) {
    const input = document.getElementById("itemInput");
    const value = productName ? `${productName}${platform ? `,${platform}` : ""}` : input.value.trim();
    input.value = "";
    if (value.includes(",")) {
        // Handle Videojoc
        const [gameName, gamePlatform] = value.split(",").map(v => v.trim());
        if (gameName && gamePlatform) {
            const newGame = {
                nom: gameName,
                genere: "Unknown",
                any: new Date().getFullYear(),
                tipus: "Videojoc",
                plataforma: gamePlatform
            };
            games.push(newGame);
            ProductManager.saveProducts("videojocs", games);
        }
    }
    else if (value) {
        // Handle Pel·licula
        const newMovie = {
            nom: value,
            genere: "Unknown",
            any: new Date().getFullYear(),
            tipus: "Pel·licula",
            director: "" // Optional field
        };
        movies.push(newMovie);
        ProductManager.saveProducts("pelicules", movies);
    }
}
function escriureTaula(titol, objectes, objectes2) {
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = "";
    const table = document.createElement("table");
    const header = document.createElement("tr");
    header.innerHTML = objectes2 ? "<th>Pel·lícules</th><th>Videojocs</th>" : `<th>${titol}</th>`;
    table.appendChild(header);
    const maxLength = Math.max(objectes.length, (objectes2 === null || objectes2 === void 0 ? void 0 : objectes2.length) || 0);
    for (let i = 0; i < maxLength; i++) {
        const row = document.createElement("tr");
        if (objectes2) {
            const movie = objectes[i];
            const game = objectes2[i];
            row.innerHTML = `
        <td>${(movie === null || movie === void 0 ? void 0 : movie.nom) || ""}${(movie === null || movie === void 0 ? void 0 : movie.director) ? ` (Dir. ${movie.director})` : ""}</td>
        <td>${(game === null || game === void 0 ? void 0 : game.nom) || ""}${(game === null || game === void 0 ? void 0 : game.plataforma) ? ` (${game.plataforma})` : ""}</td>
      `;
        }
        else {
            const product = objectes[i];
            row.innerHTML = `<td>${(product === null || product === void 0 ? void 0 : product.nom) || ""}</td>`;
        }
        table.appendChild(row);
    }
    tableContainer.appendChild(table);
}
function mostrarDades(tipus) {
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
            }
            else {
                mostrarMissatge("Aquest correu electrònic ja està registrat!");
            }
        }
        catch (error) {
            mostrarMissatge("Error en processar el nou client");
        }
    }
    mostrarClients(clients);
    const ultimFiltre = localStorage.getItem("ultimFiltre") || "all";
    mostrarDades(ultimFiltre === "all" ? undefined : ultimFiltre);
});
//# sourceMappingURL=videoclub.js.map