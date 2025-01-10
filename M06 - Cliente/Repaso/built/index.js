// Calcula si el parametro "doble" es divisible por 4
function clic() {
    // Recoje el valor del parametro con la id "text"
    var doble = (document.getElementById("text").value);
    // Variable donde añadiremos el resultado con mayusculas intercaladas
    var news = "";
    // Mide el tamaño de la variable doble
    var lenght = doble.length;
    // Condicional para comprobar si es divisible
    if (lenght % 4 == 0) {
        console.log("Es divisible por 4");
    }
    else
        console.log("No es divisible por 4");
    // Bucle para añadir parametros al string
    for (var i = 0; i <= lenght; i++) {
        // Calculas si es par o impar
        if (i % 2 == 0) {
            // Añades el caracter en posicion i en mayuscula si es impar
            news = news + doble.charAt(i).toUpperCase();
            // Añades el caracter en posicion i en minuscula si es par
        }
        else
            news = news + doble.charAt(i).toLowerCase();
    }
    console.log(news);
}
