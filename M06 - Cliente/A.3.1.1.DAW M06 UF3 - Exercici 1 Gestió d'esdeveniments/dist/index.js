"use strict";
//Identificadores
const clicI = document.getElementById("barcelona");
const clicD = document.getElementById("madrid");
let red = document.getElementById("red");
let redC = parseInt(red.innerText);
let org = document.getElementById("orange");
let orgC = parseInt(org.innerText);
let purp = document.getElementById("purple");
let purpC = parseInt(purp.innerText);
let brow = document.getElementById("brown");
let browC = parseInt(brow.innerText);
let blu = document.getElementById("blue");
let bluC = parseInt(blu.innerText);
let gre = document.getElementById("green");
//Barcelona
clicI.addEventListener("click", () => {
    redC++;
    red.innerText = String(redC);
});
clicI.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    redC--;
    if (redC < 0) {
        redC = 0;
    }
    else
        red.innerText = String(redC);
});
clicI.addEventListener("mouseenter", () => {
    browC++;
    brow.innerText = String(browC);
});
//Madrid
clicD.addEventListener("click", () => {
    orgC++;
    org.innerText = String(orgC);
});
clicD.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    orgC--;
    if (orgC < 0) {
        orgC = 0;
    }
    else
        org.innerText = String(orgC);
});
clicD.addEventListener("mouseout", () => {
    purpC++;
    purp.innerText = String(purpC);
});
//General
document.body.addEventListener("dblclick", () => {
    bluC++;
    blu.innerText = String(bluC);
});
document.addEventListener("keypress", (event) => {
    if (event.key == "0") {
        gre.textContent = "0";
    }
    else
        gre.textContent += event.key;
});
//# sourceMappingURL=index.js.map