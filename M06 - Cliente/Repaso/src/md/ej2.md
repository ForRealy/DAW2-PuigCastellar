```
let i: number; // Variable para el bucle
let a: string = "a"; // Variable para hacer manipular

// Repetimos 10 veces el bucle (empieza en 0)
for (i = 0; i <= 9; i++) {

    // Si es minuscula transformamos a mayuscula y guardamos la variable
    if (a == "a") {
        console.log(a.toUpperCase());
        a = "A";

    // Si es mayuscula transformamos a minuscula y guardamos la variable
    } else if (a == "A") {
        console.log(a.toLowerCase());
        a = "a";
    }
}
```