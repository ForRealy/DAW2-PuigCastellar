```
function diaDeLaSetmana() {
  // Recojer el valor del input con id "data"
  var inputValue = (<HTMLInputElement>document.getElementById('data')).value,
  
  // Expresion regular para comprovar la fecha
  regex = new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/),
  
  // Comprobar que el contenido del input es correcto
  test = regex.test(inputValue);
  console.log(test);
  
  // Condicionnal para sacar el dia de la semana
  // Se inicia si la comprovacion es positiva
  if (test) {
    //Divido el array en / para que lo lea el date
    let parts = inputValue.split('/');

    // Le damos el formato que queremos para que lo lea el date dd/mm/yyyy
    let formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

    // Instanciamos el date y le damos nuestra fecha
    let date = new Date(formattedDate);

    // Le pedimos el dia de la semana con getDay y lo sacamos por consola
    let weekDay = date.getDay();
    console.log(weekDay);
  }
}


```