"use strict";
function exercici1() {
    //Recojo ambos campos como string transformandolos dilectamenta para obtener el valor
    let camp1 = String(document.getElementById("camp1").value);
    let camp2 = String(document.getElementById("camp2").value);
    //Creo dos variables number que seran tan largas como el imput
    let camp1L = camp1.length;
    let camp2L = camp2.length;
    //Condicional que indica si camp1 es mas pequeño
    if (camp1L < camp2L) {
        //Si es mas pequeño imprimimos por consola la suma
        console.log(camp1L + camp2L);
        //Si es mas grande imprimimos por consola la dividimos
    }
    else
        console.log(camp1L / camp2L);
}
/*
Este ejercicio no funciona es un intento de como deberia ser
que no pude arreglar a tiempo
*/
function exercici2() {
    //Tomamos el contenido de las id y lo transformamos en nombres
    let camp1 = parseInt(document.getElementById("camp1").value);
    let camp2 = parseInt(document.getElementById("camp2").value);
    //Repetimos el bucle el numero de veces que valga camp1
    for (let i = 0; i >= camp1; i++) {
        //Generamos en cada ida del bucle un numero aleatorio y comprovamos
        //Si este es divisible por el segundo campo
        if (Math.floor(Math.random() * (100 - 1) + 1) % camp2 == 0) {
            //Si no es divisible mandamos un mensaje de error y rompemos el bucle
        }
        else
            console.log("Numero no divisible");
        break;
    }
}
/**
 * Este ejercicio esta realicado con seudocodigo y ideas inacabadas
 * por falta de pracica en la materia
 */
function exercici3() {
    //Input para el codigo de color
    let camp1 = parseInt(document.getElementById("camp1").value);
    //Imput para el tamaño en px de la pagina
    let camp2 = parseInt(document.getElementById("camp2").value);
    /**
       * window.open("", "_blank", camp2);
       * window.document.styleSheets.color("#" + camp1)
       * */
    if (camp1 % 2 == 0) {
        /*
               * window.document.h1.("Alejandro")
               */
    }
    else
        console.log("impar");
    /**
         * window.document.h1.("Puig Castellar")
         */
}
//# sourceMappingURL=examen.js.map