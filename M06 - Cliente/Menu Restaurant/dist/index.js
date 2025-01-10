import { persona } from 'persona.js';
class Client extends persona {
    constructor(name, lastName, dni) {
        super(name, lastName, dni);
        this.orders = [];
    }
}
class Treballador extends persona {
    constructor(name, lastName, dni, torn, carrec) {
        super(name, lastName, dni);
        this.torn = torn;
        this.carrec = carrec;
    }
}
const clients = [];
const treballadors = [];
const orders = [];
// Afegir un nou client
function addClient() {
    const clientNom = document.getElementById("clientNom").value.trim();
    const clientLastName = document.getElementById("clientLastName").value.trim();
    const clientDNI = document.getElementById("clientDNI").value.trim();
    if (!clientNom || !clientLastName || !clientDNI) {
        alert("Rellena todos los datos");
        return;
    }
    if (clients.some(client => client.name == clientNom && client.dni == clientDNI)) {
        alert("El cliente ya existe");
        return;
    }
    const newClient = new Client(clientNom, clientLastName, clientDNI);
    clients.push(newClient);
    alert(`Cliente "${clientNom}" añadido exitosamente`);
}
// Afegir una nova comanda
function addOrder() {
    const comandaNom = document.getElementById("comandaNom").value.trim();
    const comandaPreu = parseFloat(document.getElementById("comandaPreu").value);
    if (!comandaNom || isNaN(comandaPreu) || comandaPreu <= 0) {
        alert("Introdueix una comanda vàlida amb un preu vàlid.");
        return;
    }
    if (orders.some(order => order.name === comandaNom)) {
        alert("La comanda ja existeix.");
        return;
    }
    orders.push({ name: comandaNom, price: comandaPreu });
    alert(`Comanda "${comandaNom}" afegida correctament.`);
}
// Assignar una comanda a un client
function assignOrderToClient() {
    const assignClient = document.getElementById("assignClient").value.trim();
    const assignComanda = document.getElementById("assignComanda").value.trim();
    const client = clients.find(c => c.name === assignClient);
    const order = orders.find(o => o.name === assignComanda);
    if (!client) {
        alert("El client no existeix.");
        return;
    }
    if (!order) {
        alert("La comanda no existeix.");
        return;
    }
    // Afegir la comanda al client
    if (!client.orders.includes(order)) {
        client.orders.push(order);
        alert(`Comanda "${assignComanda}" assignada a "${assignClient}".`);
    }
    else {
        alert(`El client ja té aquesta comanda assignada.`);
    }
}
// Mostrar clients
function showClients() {
    const clientsOutput = document.getElementById("clientsOutput");
    if (clients.length === 0) {
        clientsOutput.innerHTML = `<p>No hi ha clients registrats.</p>`;
        return;
    }
    clientsOutput.innerHTML = `
        <ul>
            ${clients.map(client => `<li>${client.name} ${client.lastName} - DNI: ${client.dni}</li>`).join("")}
        </ul>
    `;
}
// Mostrar comandes
function showOrders() {
    const ordersOutput = document.getElementById("ordersOutput");
    ordersOutput.innerHTML = orders.map(order => `<p>${order.name} - $${order.price.toFixed(2)}</p>`).join("");
}
// Mostrar comandes d’un client
function showClientOrders() {
    const clientName = document.getElementById("clientComandes").value.trim();
    const clientOrdersOutput = document.getElementById("clientOrdersOutput");
    const client = clients.find(c => c.name === clientName);
    if (!client) {
        clientOrdersOutput.innerHTML = `<p>El client "${clientName}" no existeix.</p>`;
        return;
    }
    if (client.orders.length === 0) {
        clientOrdersOutput.innerHTML = `<p>El client "${clientName}" no té comandes.</p>`;
        return;
    }
    clientOrdersOutput.innerHTML = `
        <h3>Comandes de ${clientName}</h3>
        <ul>
            ${client.orders.map(order => `<li>${order.name} - $${order.price.toFixed(2)}</li>`).join("")}
        </ul>
    `;
}
