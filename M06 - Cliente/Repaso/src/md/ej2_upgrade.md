```
let i: number; // Variable para el bucle
let a: string = "b"; // Variable para hacer manipular

// Repetimos 10 veces el bucle (empieza en 0)
for (i = 0; i <= 9; i++) {
  // Cuando sea impar lo transformamos en mayuscula
  if (i % 2 == 0) {
    console.log(a.toUpperCase());

    // Cuando sea par lo transformamos en minuscula
  } else console.log(a.toLowerCase());
}
```