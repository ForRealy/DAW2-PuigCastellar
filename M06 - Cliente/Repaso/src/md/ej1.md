```
// Calcula si el parametro "doble" es divisible por 4
function clic () {
    // Recoje el valor del parametro y se transforma en int para manipularlo
    let doble:number = parseInt((document.getElementById("text") as HTMLInputElement).value);

    // Condicional para comprobar si es divisible
    if (doble % 4 == 0){
    console.log("Es divisible");
    }else 
    console.log("No es divisible");
}
```