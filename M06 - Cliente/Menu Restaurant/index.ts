export { RestaurantX };

import { Client } from './client';
import { Treballador } from './treballador';
namespace RestaurantX {

    // Llistes per emmagatzemar els clients i treballadors
    export const clients: Client[] = [];
    export const treballadors: Treballador[] = [];

    // Afegir un nou client
    export function addClient() {
        const clientNom = (<HTMLInputElement>document.getElementById("clientNom")).value.trim();
        const clientCognoms = (<HTMLInputElement>document.getElementById("clientCognoms")).value.trim();

        if (!clientNom || !clientCognoms) {
            alert("Introdueix un nom i cognoms vàlids per al client.");
            return;
        }

        const client = new Client(clientNom, clientCognoms);
        clients.push(client);
        alert(`Client "${clientNom} ${clientCognoms}" afegit correctament.`);
    }

    // Afegir una nova comanda
    export function addOrder() {
        const comandaNom = (<HTMLInputElement>document.getElementById("comandaNom")).value.trim();
        const comandaPreu = parseFloat((<HTMLInputElement>document.getElementById("comandaPreu")).value);

        if (!comandaNom || isNaN(comandaPreu) || comandaPreu <= 0) {
            alert("Introdueix una comanda vàlida amb un preu vàlid.");
            return;
        }

        const clientNom = (<HTMLInputElement>document.getElementById("assignClient")).value.trim();
        const client = clients.find(c => c.nom === clientNom);

        if (!client) {
            alert("El client no existeix.");
            return;
        }

        client.afegirComanda(comandaNom);
        alert(`Comanda "${comandaNom}" afegida a "${clientNom}".`);
    }

    // Afegir un nou treballador
    export function addTreballador() {
        const treballadorNom = (<HTMLInputElement>document.getElementById("treballadorNom")).value.trim();
        const treballadorCognoms = (<HTMLInputElement>document.getElementById("treballadorCognoms")).value.trim();
        const treballadorDNI = (<HTMLInputElement>document.getElementById("treballadorDNI")).value.trim();
        const treballadorTorn = (<HTMLInputElement>document.getElementById("treballadorTorn")).value.trim();
        const treballadorCàrrec = (<HTMLInputElement>document.getElementById("treballadorCàrrec")).value.trim();

        if (!treballadorNom || !treballadorCognoms || !treballadorDNI || !treballadorTorn || !treballadorCàrrec) {
            alert("Introdueix totes les dades del treballador.");
            return;
        }

        const treballador = new Treballador(treballadorNom, treballadorCognoms, treballadorDNI, treballadorTorn, treballadorCàrrec);
        treballadors.push(treballador);
        alert(`Treballador "${treballadorNom} ${treballadorCognoms}" afegit correctament.`);
    }

    // Mostrar clients
    export function showClients() {
        const clientsOutput = document.getElementById("clientsOutput")!;
        clientsOutput.innerHTML = clients.map(client => `<p>${client.mostrarInformacio()}</p>`).join("");
    }

    // Mostrar treballadors
    export function showTreballadors() {
        const treballadorsOutput = document.getElementById("treballadorsOutput")!;
        treballadorsOutput.innerHTML = treballadors.map(treballador => `<p>${treballador.mostrarInformacio()}</p>`).join("");
    }
}