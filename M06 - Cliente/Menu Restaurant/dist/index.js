import { Client } from './client.js';
import { Treballador } from './treballador.js';
export var RestaurantX;
(function (RestaurantX) {
    // Llistes per emmagatzemar els clients i treballadors
    RestaurantX.clients = [];
    RestaurantX.treballadors = [];
    const buttonAddCLient = document.getElementById("addClientHTML");
    const buttonShowClient = document.getElementById("showClientHTML");
    // Afegir un nou client
    buttonAddCLient.addEventListener('click', function addClient() {
        const clientNom = document.getElementById("clientNom").value.trim();
        const clientCognoms = document.getElementById("clientCognoms").value.trim();
        if (!clientNom || !clientCognoms) {
            alert("Introdueix un nom i cognoms vàlids per al client.");
            return;
        }
        const client = new Client(clientNom, clientCognoms);
        RestaurantX.clients.push(client);
        alert(`Client "${clientNom} ${clientCognoms}" afegit correctament.`);
    });
    // Afegir una nova comanda
    function addOrder() {
        const comandaNom = document.getElementById("comandaNom").value.trim();
        const comandaPreu = parseFloat(document.getElementById("comandaPreu").value);
        if (!comandaNom || isNaN(comandaPreu) || comandaPreu <= 0) {
            alert("Introdueix una comanda vàlida amb un preu vàlid.");
            return;
        }
        const clientNom = document.getElementById("assignClient").value.trim();
        const client = RestaurantX.clients.find(c => c.nom === clientNom);
        if (!client) {
            alert("El client no existeix.");
            return;
        }
        client.afegirComanda(comandaNom);
        alert(`Comanda "${comandaNom}" afegida a "${clientNom}".`);
    }
    RestaurantX.addOrder = addOrder;
    // Afegir un nou treballador
    function addTreballador() {
        const treballadorNom = document.getElementById("treballadorNom").value.trim();
        const treballadorCognoms = document.getElementById("treballadorCognoms").value.trim();
        const treballadorDNI = document.getElementById("treballadorDNI").value.trim();
        const treballadorTorn = document.getElementById("treballadorTorn").value.trim();
        const treballadorCàrrec = document.getElementById("treballadorCàrrec").value.trim();
        if (!treballadorNom || !treballadorCognoms || !treballadorDNI || !treballadorTorn || !treballadorCàrrec) {
            alert("Introdueix totes les dades del treballador.");
            return;
        }
        const treballador = new Treballador(treballadorNom, treballadorCognoms, treballadorDNI, treballadorTorn, treballadorCàrrec);
        RestaurantX.treballadors.push(treballador);
        alert(`Treballador "${treballadorNom} ${treballadorCognoms}" afegit correctament.`);
    }
    RestaurantX.addTreballador = addTreballador;
    // Mostrar clients
    buttonShowClient.addEventListener('click', function showClients() {
        const clientsOutput = document.getElementById("clientsOutput");
        clientsOutput.innerHTML = RestaurantX.clients.map(client => `<p>${client.mostrarInformacio()}</p>`).join("");
    });
    // Mostrar treballadors
    function showTreballadors() {
        const treballadorsOutput = document.getElementById("treballadorsOutput");
        treballadorsOutput.innerHTML = RestaurantX.treballadors.map(treballador => `<p>${treballador.mostrarInformacio()}</p>`).join("");
    }
    RestaurantX.showTreballadors = showTreballadors;
})(RestaurantX || (RestaurantX = {}));
//# sourceMappingURL=index.js.map