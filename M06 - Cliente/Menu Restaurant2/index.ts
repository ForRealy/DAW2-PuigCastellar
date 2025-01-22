import GestioRecursos from './GestioRecursos.js';
import Client from './Client.js';
import Comanda from './Comanda.js';

//Inicialitzacio classe generica que utilitzara client o comanda
const gestioRecursos = new GestioRecursos<Client | Comanda>();

//Declaracio elements HTML per agafar i mostrar informacio
const clientNameInput = document.getElementById('clientName') as HTMLInputElement;
const clientLastNameInput = document.getElementById('clientLastName') as HTMLInputElement;
const clientDniInput = document.getElementById('clientDni') as HTMLInputElement;
const clientCreditInput = document.getElementById('clientCredit') as HTMLInputElement;
const comandaPlatsInput = document.getElementById('comandaPlats') as HTMLInputElement;
const resourceTypeSelect = document.getElementById('resourceType') as HTMLSelectElement;
const resourceList = document.getElementById('resourceList') as HTMLUListElement;

//Declaracio buttons per afegir la funcionalitat des de TS
const addClientButton = document.getElementById('addClientButton') as HTMLButtonElement;
const addComandaButton = document.getElementById('addComandaButton') as HTMLButtonElement;
const showResourcesButton = document.getElementById('showResourcesButton') as HTMLButtonElement;

//Funcionalitat afegir client
addClientButton.onclick = () => {
  //Recuperem els valors dels inputs
  const nom = clientNameInput.value;
  const cognoms = clientLastNameInput.value;
  const dni = clientDniInput.value;
  const credit = parseFloat(clientCreditInput.value);

  //Si tots son correctes, creem un client i ho afegim a la llista de la classe generica
  if (nom && cognoms && dni && !isNaN(credit)) {
    const newClient = new Client(nom, cognoms, dni, credit);
    gestioRecursos.afegirRecurs(newClient);

    //Buidem tots els camps
    clientNameInput.value = '';
    clientLastNameInput.value = '';
    clientDniInput.value = '';
    clientCreditInput.value = '';
  } 
};

//Funcionalitat afegir Comanda
addComandaButton.onclick = () => {
  //Recuperem els valors dels inputs
  const plats = comandaPlatsInput.value;

  //Si es correcte, creem una comanda i l'afegim a la llista de la classe generica
  if (plats) {
    const newComanda = new Comanda(plats);
    gestioRecursos.afegirRecurs(newComanda);
    
    //Buidem tots els camps
    comandaPlatsInput.value = '';
  }
};

//Funcionalitat mostrar recursos
showResourcesButton.onclick = () => {
  //Comprobem el valor demanat i recuperem els recursos d'aquest
  const selectedType = resourceTypeSelect.value;
  const recursos = gestioRecursos.mostrarRecursos(selectedType);

  //Buidem la llista previa
  resourceList.innerHTML = '';

  //Si hi ha recursos, els mostrem afegin a la llista
  if (recursos.length > 0) {
    recursos.forEach(recurs => {
      const listItem = document.createElement('li');

      //Es distingeix segons si es client o comanda
      if (recurs instanceof Client) {
        listItem.textContent = `Cliente - Nombre: ${recurs.nom}, Apellidos: ${recurs.cognoms}, DNI: ${recurs.getDni}, Crédito: ${recurs.getCredit}`;
      } else if (recurs instanceof Comanda) {
        listItem.textContent = `Comanda - ID: ${recurs.getId()}, Platos: ${recurs.plats}`;
      }

      resourceList.appendChild(listItem);
    });
  //Si no hi ha, informem
  } else {
    const noResourcesItem = document.createElement('li');
    noResourcesItem.textContent = 'No hay recursos de este tipo.';
    resourceList.appendChild(noResourcesItem);
  }
};
