```
// Calcula si el parametro "doble" es divisible por 4
function clic () {
  // Recoje el valor del parametro con la id "text"
  let doble:string = ((document.getElementById("text") as HTMLInputElement).value);
  
  // Variable donde añadiremos el resultado con mayusculas intercaladas
  let news:String = "";

  // Mide el tamaño de la variable doble
  let lenght:number = doble.length;

  // Condicional para comprobar si es divisible
  if (lenght % 4 == 0){
  console.log("Es divisible por 4");
  }else 
  console.log("No es divisible por 4");

  // Bucle para añadir parametros al string
  for (let i:number = 0; i <= lenght; i++) {
      
      // Calculas si es par o impar
      if (i % 2 == 0) {
          // Añades el caracter en posicion i en mayuscula si es impar
          news = news + doble.charAt(i).toUpperCase();
          // Sñades el caracter en posicion i en minuscula si es par
      } else  news = news + doble.charAt(i).toLowerCase();
  }
  console.log(news);
}
```