"use strict";
var RestaurantX;
(function (RestaurantX) {
    // Clase Pare: Persona
    class Persona {
        constructor(nom, cognoms) {
            this.nom = nom;
            this.cognoms = cognoms;
        }
        // Mètode comú per mostrar el nom i els cognoms
        mostrarInformacio() {
            return `${this.nom} ${this.cognoms}`;
        }
    }
    RestaurantX.Persona = Persona;
    // Classe Filla: Client
    class Client extends Persona {
        constructor(nom, cognoms) {
            super(nom, cognoms); // Crida al constructor de la classe pare
            this.comandes = [];
        }
        // Afegir una comanda al client
        afegirComanda(comanda) {
            this.comandes.push(comanda);
        }
        // Mètode per mostrar la informació del client
        mostrarInformacio() {
            const info = super.mostrarInformacio(); // Obtenir nom i cognoms
            return `${info} ha realitzat ${this.comandes.length} comanda(s).`;
        }
    }
    RestaurantX.Client = Client;
    // Classe Filla: Treballador
    class Treballador extends Persona {
        constructor(nom, cognoms, dni, torn, càrrec) {
            super(nom, cognoms); // Crida al constructor de la classe pare
            this.dni = dni;
            this.torn = torn;
            this.càrrec = càrrec;
        }
        // Mètode per mostrar la informació del treballador
        mostrarInformacio() {
            const info = super.mostrarInformacio(); // Obtenir nom i cognoms
            return `${info}, DNI: ${this.dni}, Torn: ${this.torn}, Càrrec: ${this.càrrec}`;
        }
    }
    RestaurantX.Treballador = Treballador;
    // Llistes per emmagatzemar els clients i treballadors
    RestaurantX.clients = [];
    RestaurantX.treballadors = [];
    // Afegir un nou client
    function addClient() {
        const clientNom = document.getElementById("clientNom").value.trim();
        const clientCognoms = document.getElementById("clientCognoms").value.trim();
        if (!clientNom || !clientCognoms) {
            alert("Introdueix un nom i cognoms vàlids per al client.");
            return;
        }
        const client = new Client(clientNom, clientCognoms);
        RestaurantX.clients.push(client);
        alert(`Client "${clientNom} ${clientCognoms}" afegit correctament.`);
    }
    RestaurantX.addClient = addClient;
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
    function showClients() {
        const clientsOutput = document.getElementById("clientsOutput");
        clientsOutput.innerHTML = RestaurantX.clients.map(client => `<p>${client.mostrarInformacio()}</p>`).join("");
    }
    RestaurantX.showClients = showClients;
    // Mostrar treballadors
    function showTreballadors() {
        const treballadorsOutput = document.getElementById("treballadorsOutput");
        treballadorsOutput.innerHTML = RestaurantX.treballadors.map(treballador => `<p>${treballador.mostrarInformacio()}</p>`).join("");
    }
    RestaurantX.showTreballadors = showTreballadors;
})(RestaurantX || (RestaurantX = {}));
