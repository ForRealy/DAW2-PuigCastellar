"use strict";
function modificarBom() {
    // Recojer el valor del input con id "name"
    let inputValue = document.getElementById('name').value;
    // Crear bucle para abrir ventanas
    let repeat = 0;
    do {
        repeat++;
        // Abrimos en una ventana nueva con window.open y _blank
        let vent = window.open('', '', 'width=300,height=300,');
        let color = Math.floor(Math.random() * 16777215).toString(16);
        vent === null || vent === void 0 ? void 0 : vent.document.body.style.backgroundColor = "#" + color;
        const p = document.createElement("p");
        p.textContent = inputValue;
        vent === null || vent === void 0 ? void 0 : vent.document.body.appendChild(p);
    } while (repeat < 5);
}
