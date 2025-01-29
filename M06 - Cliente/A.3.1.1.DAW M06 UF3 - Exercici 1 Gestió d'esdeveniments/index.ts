//Identificadores
const clicI = document.getElementById("barcelona") as HTMLImageElement;
const clicD = document.getElementById("madrid") as HTMLImageElement;

let red = document.getElementById("red") as HTMLDivElement;
let redC  = parseInt(red.innerText)

let org = document.getElementById("orange") as HTMLDivElement;
let orgC  = parseInt(org.innerText)


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
    console.log("barcelona falta");
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
    console.log("madrid falta");
});