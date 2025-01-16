//import GestioRecursos from './GestioRecursos.js';
import client from './client.js';
//import Comanda from './Comanda.js';

const gestioRecursos = new GestioRecursos<Client | Comanda>();

const clientNameInput = document.getElementById('clientName') as HTMLInputElement;
const clientLastNameInput = document.getElementById('clientLastName') as HTMLInputElement;
const clientDniInput = document.getElementById('clientDni') as HTMLInputElement;
const clientCreditInput = document.getElementById('clientCredit') as HTMLInputElement;
const comandaPlatsInput = document.getElementById('comandaPlats') as HTMLInputElement;
const resourceTypeSelect = document.getElementById('resourceType') as HTMLSelectElement;
const resourceList = document.getElementById('resourceList') as HTMLUListElement;

const addClientButton = document.getElementById('addClientButton') as HTMLButtonElement;
const addComandaButton = document.getElementById('addComandaButton') as HTMLButtonElement;
const showResourcesButton = document.getElementById('showResourcesButton') as HTMLButtonElement;

addClientButton.onclick = () => {
  //TODO
  //
};

addComandaButton.onclick = () => {
  //TODO
};

showResourcesButton.onclick = () => {
  //TODO
};
