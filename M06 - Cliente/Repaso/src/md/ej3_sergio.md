```
function operacionTexto() {
  // Variable declarada para guardar el string mas tarde
  let alternate: string = "";

  // Variable para recibir el imput de la id "text"
  const input: HTMLInputElement | null = document.getElementById(
    "text"
  ) as HTMLInputElement;

  if (input) {
    const inputValue: string = input.value;
    const inputLenght: number = inputValue.length;

    // Bucle para imprimir una mayuscula una minuscula altrnando y guardarlo en el string "alternate"
    for (let i = 0; i < inputLenght; i++) {
      if (i % 2 == 0) {
        alternate += inputValue.charAt(i).toUpperCase();
      } else {
        alternate += inputValue.charAt(i).toLowerCase();
      }
    }

    // Si el imput esta vacio soltar error y no continuar
    if (inputLenght == 0) {
      console.log("No has añadido texto");
      return;

      // Condicional que comprueba si es divisible por 4
    } else if (inputLenght % 4 == 0) {
      console.log(alternate + " Es divisible por 4");
    } else {
      console.log(alternate + " No es divisible por 4");
    }
  }
}
```