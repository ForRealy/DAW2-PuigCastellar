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
        const clients = localStorage.getItem("clients");
        return clients ? JSON.parse(clients) : [];
    }
    static saveToLocalStorage(clients) {
        localStorage.setItem("clients", JSON.stringify(clients));
    }
}
const movies = [
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
];
const games = [
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
];
// Muestra la lista de clientes en el elemento con id "clientList"
function mostrarClients(clients) {
    const clientList = document.getElementById("clientList");
    if (!clientList) {
        console.error('No se encontró "clientList"');
        return;
    }
    clientList.innerHTML = "";
    for (const client of clients) {
        const li = document.createElement("li");
        li.textContent = `${client.nom} - ${client.email}`;
        clientList.appendChild(li);
    }
}
// Muestra un mensaje de error al inicio de la página
function mostrarError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.style.color = "red";
    errorDiv.textContent = message;
    document.body.prepend(errorDiv);
}
// Carga datos y agrega un nuevo cliente si hay parámetros en la URL
function carregarDades() {
    const clients = Client.loadFromLocalStorage();
    const params = new URLSearchParams(window.location.search);
    if (params.has("nom")) {
        const newClient = Client.fromURLParams(params);
        const emailExists = clients.some(client => client.email.toLowerCase() === newClient.email.toLowerCase());
        if (!emailExists) {
            clients.push(newClient);
            Client.saveToLocalStorage(clients);
        }
        else {
            mostrarError("Aquest correu electrònic ja està registrat!");
        }
    }
    mostrarClients(clients);
}
// Muestra una tabla con productos (películas y videojuegos)
function mostrarDades(filter) {
    const container = document.getElementById("tableContainer");
    if (!container) {
        console.error('No se encontró "tableContainer"');
        return;
    }
    let data;
    if (filter === "Pel·licules") {
        data = movies;
    }
    else if (filter === "Videojocs") {
        data = games;
    }
    else {
        data = [...movies, ...games];
    }
    // Si no hay filtro, se muestran detalles
    const showDetails = !filter;
    let tableHTML = `<table class="content-table">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Tipus</th>
        <th>Gènere</th>
        <th>Any</th>
        ${showDetails ? "<th>Detalls</th>" : ""}
      </tr>
    </thead>
    <tbody>`;
    for (const item of data) {
        tableHTML += `<tr>
        <td>${item.nom}</td>
        <td>${item.tipus}</td>
        <td>${item.genere}</td>
        <td>${item.any}</td>
        ${showDetails ? `<td>${item.director || item.plataforma || ""}</td>` : ""}
      </tr>`;
    }
    tableHTML += `</tbody></table>`;
    container.innerHTML = tableHTML;
}
// Cuando el DOM esté listo, carga los datos y muestra la tabla
document.addEventListener("DOMContentLoaded", () => {
    carregarDades();
    mostrarDades();
});
//# sourceMappingURL=videoclub.js.map