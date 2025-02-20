"use strict";
// script.ts
document.addEventListener('DOMContentLoaded', () => {
    // Inicialitzar comptador per als elements
    let counter = 1;
    // Seleccionar elements del DOM
    const addButton = document.getElementById('addButton');
    const itemList = document.getElementById('itemList');
    // Funció per afegir elements
    const addItem = () => {
        const newItem = document.createElement('li');
        newItem.textContent = `Element ${counter}`;
        itemList.appendChild(newItem);
        counter++;
    };
    // Afegir event listener al botó
    addButton.addEventListener('click', addItem);
});
//# sourceMappingURL=index.js.map