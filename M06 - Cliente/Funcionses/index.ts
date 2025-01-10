function classificarParaules (paraules: string[]){
    var param: string[] = [];
    for (let i = 0; i < paraules.length; i++) {
        if (paraules [i].length > 5){
            param.push (paraules[i]);
        }
    }
    return param
}

function analitzarTemperatures (...valores: number[]){
    
    const suma: number = valores.reduce((acumulador, actual) => acumulador + actual, 0);
    const media: string = (suma / valores.length).toFixed(2);
    
    const table = document.getElementById('taulaTemperatures') as HTMLTableElement;

    if (table) {
        const newRow = table.insertRow(); 

        
        const avgCell = newRow.insertCell(0);
        const maxCell = newRow.insertCell(1);
        const minCell = newRow.insertCell(2);

       
        avgCell.textContent = media;
        maxCell.textContent = Math.max(...valores).toString();
        minCell.textContent = Math.min(...valores).toString();
    }
}


function enviarMissatges (dat:string | number, msj:string, salu?:string){
    if (typeof dat == "string"){
        if(dat.includes("@")){
            console.log(dat, msj, salu)
        }else alert("L'email no té un format vàlid");
    } 
    if (typeof dat == "number"){
        const datString = dat.toString();
        if(datString.length == (9)){
            console.log(dat, msj, salu)
        }else alert("El telefon no té un format vàlid");
    }
}

//Funció per provar les funcions realitzades, comenteu i descomenteu una linea per separat per provar les diferents opcions
function execucions(){
    // Exercici 1: Classificar Paraules
    const paraules:string[] = ["cotxe", "avió", "ferrocarril", "vaixell", "motocicleta", "tractor"]; //Resultat: 4 elements: ferrocarril, vaixell, motocicleta, tractor
    //const paraules:string[] = ["blau", "vermell", "taronja", "gris", "platejat"]; //Resultat: 3 elements: vermell, taronja, platejat
    //const paraules:string[] = ["gos", "gat", "elefant", "caball"]; //Resultat: 2 elements: elefant, caball
    
    console.log(classificarParaules(paraules));
    
    // Exercici 2: Analitzar Temperatures
    analitzarTemperatures(12,4,30,2,11,26);
    //Resultat: Mitjana 14.17, Màxima 30, Mínima 2 
    
    analitzarTemperatures(9,15,7,5,8);
    //Resultat: Mitjana 8.80, Màxima 15, Mínima 5 
    
    analitzarTemperatures(19,20,21); 
    //Resultat: Mitjana 20.00, Màxima 21, Mínima 19 

    // Exercici 3: Enviar Missatges
    //enviarMissatges("test@mail.com", "Demano informació sobre aquest curs"); //Resultat: Missatge enviat a l'email, contingut: Demano informació sobre aquest curs
    enviarMissatges("test@mail.com", "Demano informació sobre aquest curs", "Salutacions"); //Resultat: Missatge enviat a l'email, contingut: Salutacions Demano informació sobre aquest curs
    enviarMissatges(985421122, "Demano informació sobre aquest curs"); //Resultat (alert): Missatge enviat al telèfon, contingut: Demano informació sobre aquest curs
    //enviarMissatges(985421122, "Demano informació sobre aquest curs", "Salutacions"); //Resultat (alert): Missatge enviat al telèfon, contingut: Salutacions Demano informació sobre aquest curs
    //enviarMissatges("error", "error"); //Resultat: L'email no té un format vàlid.
}

