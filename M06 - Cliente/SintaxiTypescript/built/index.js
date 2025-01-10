"use strict";
let money = Number(prompt("Dinero disponible:")); //Variable let para el dinero que tenemos
if (isNaN(money) || money < 0) { // Comprovacion de que el dinero sea un numero
    alert("Por favor, ingresa un numero válido."); // Aviso de fallo de datos
}
else {
    let productQuest = String(prompt("¿Quieres introducir un producto? Responde con Si o No:")); //Variable let para introducir productos
    if (productQuest.toLowerCase() == "si") { //Condicional para confirmar respuesta positiva
        do { //Bucle para preguntar los datos
            var productName = String(prompt("Nombre del producto:")); //Variable var para el nombre del producto
            var productSale = Number(prompt("Precio de " + productName + ":")); //Variable var para pedir el precio del producto
            var productNum = Number(prompt("Cantidad del producto disponible:")); // Variable var para preguntar por la cantidad de unidades del pedido
            var again = String((prompt("Confirmas el pedido?:"))); //Confirmacion del pedido
        } while (again.toLowerCase() != "si"); //Condicional que repetir el bucle si no confirman el pedido
        if (productSale * productNum <= money) { // Comprovacion si la operacion es valida
            alert(//Alerta con los datos de la factura
            "ORDEN CONFIRMADA " +
                productName + " - " + productSale +
                " Cantidad pedida - " + productNum +
                " Total - " + (productSale * productNum) +
                " Dinero restante - " + (money - (productSale * productNum)));
        }
        else { //Si la operacion no es valida
            alert(//Alerta con los datos de la factura
            "ORDEN DENEGADA " +
                productName + " - " + productSale +
                " Cantidad pedida - " + productNum +
                " Total - " + (productSale * productNum) +
                " El importe supera el dinero ingresado");
        }
    }
    else if (productQuest.toLowerCase() == "no") { //Condicional para confirmar respuesta negativa
        alert("Gracias, adios");
    }
    else
        alert("Error"); //Condicional para mostrar error
}
