import GestioRecursos from './GestioRecursos.js';
import Client from './Client.js';
import Comanda from './Comanda.js';
const gestioRecursos = new GestioRecursos();
const clientNameInput = document.getElementById('clientName');
const clientLastNameInput = document.getElementById('clientLastName');
const clientDniInput = document.getElementById('clientDni');
const clientCreditInput = document.getElementById('clientCredit');
const comandaPlatsInput = document.getElementById('comandaPlats');
const resourceTypeSelect = document.getElementById('resourceType');
const resourceList = document.getElementById('resourceList');
const addClientButton = document.getElementById('addClientButton');
const addComandaButton = document.getElementById('addComandaButton');
const showResourcesButton = document.getElementById('showResourcesButton');
addClientButton.onclick = () => {
    const nom = clientNameInput.value;
    const cognoms = clientLastNameInput.value;
    const dni = clientDniInput.value;
    const credit = parseFloat(clientCreditInput.value);
    if (nom && cognoms && dni && !isNaN(credit)) {
        const newClient = new Client(nom, cognoms, dni, credit);
        gestioRecursos.afegirRecurs(newClient);
        clientNameInput.value = '';
        clientLastNameInput.value = '';
        clientDniInput.value = '';
        clientCreditInput.value = '';
    }
};
addComandaButton.onclick = () => {
    const plats = comandaPlatsInput.value;
    if (plats) {
        const newComanda = new Comanda(plats);
        gestioRecursos.afegirRecurs(newComanda);
        comandaPlatsInput.value = '';
    }
};
showResourcesButton.onclick = () => {
    const selectedType = resourceTypeSelect.value;
    const recursos = gestioRecursos.mostrarRecursos(selectedType);
    resourceList.innerHTML = '';
    if (recursos.length > 0) {
        recursos.forEach(recurs => {
            const listItem = document.createElement('li');
            if (recurs instanceof Client) {
                listItem.textContent = `Cliente - Nombre: ${recurs.nom}, Apellidos: ${recurs.cognoms}, DNI: ${recurs.getDni}, Crédito: ${recurs.getCredit}`;
            }
            else if (recurs instanceof Comanda) {
                listItem.textContent = `Comanda - ID: ${recurs.getId()}, Platos: ${recurs.plats}`;
            }
            resourceList.appendChild(listItem);
        });
    }
    else {
        const noResourcesItem = document.createElement('li');
        noResourcesItem.textContent = 'No hay recursos de este tipo.';
        resourceList.appendChild(noResourcesItem);
    }
};
//# sourceMappingURL=index.js.map