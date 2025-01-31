//Identificadores
const clicI = document.getElementById("barcelona") as HTMLImageElement;
const clicD = document.getElementById("madrid") as HTMLImageElement;

let red = document.getElementById("red") as HTMLDivElement; 
let redC  = parseInt(red.innerText)

let org = document.getElementById("orange") as HTMLDivElement;
let orgC  = parseInt(org.innerText)

let purp = document.getElementById("purple") as HTMLDivElement;
let purpC  = parseInt(purp.innerText)

let brow = document.getElementById("brown") as HTMLDivElement;
let browC  = parseInt(brow.innerText)

let blu = document.getElementById("blue") as HTMLDivElement;
let bluC  = parseInt(blu.innerText)

let gre = document.getElementById("green") as HTMLDivElement;


//Barcelona
clicI.addEventListener("click", () => {
    redC++
    red.innerText = String(redC);
});

clicI.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    redC--
    if (redC < 0){
        redC = 0
    }else red.innerText = String(redC);
});
clicI.addEventListener("mouseenter", () => {
    browC++
    brow.innerText = String(browC);
});

//Madrid
clicD.addEventListener("click", () => {
    orgC++
    org.innerText = String(orgC);
});
clicD.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    orgC--
    if (orgC < 0){
        orgC = 0
    }else org.innerText = String(orgC);
});

clicD.addEventListener("mouseout", () => {
    purpC++
    purp.innerText = String(purpC);
});

//General
document.body.addEventListener("dblclick", () => {
    bluC++
    blu.innerText = String(bluC);
});

document.addEventListener("keypress", (event) => {
    if (event.key == "0"){
        gre.textContent = "0";
    }else
    gre.textContent += event.key;
});
