function modificarBom() {
  // Recojer el valor del input con id "name"
  let inputValue = (<HTMLInputElement>document.getElementById('name')).value;
  
  // Crear bucle para abrir ventanas
  let repeat:number = 0;
  do {
    repeat++
    // Abrimos en una ventana nueva con window.open y _blank
    let vent = window.open('', '', 'width=300,height=300,');
    
    // Genera un color aleatorio
    let color:string = Math.floor(Math.random()*16777215).toString(16)
    
    // Cambiamos el fondo de las nuevas ventanas por uno aleatorio cada vez
    vent?.document.body.style.backgroundColor = "#" + color;
    
    // TODO Arreglar el error pero funciona todo

    // Creamos un paragrafo con los datos de imput y lo añadimos a las nuevas ventanas
    const p = document.createElement("p");
    p.textContent = inputValue;
    vent?.document.body.appendChild(p);
  }while(repeat < 5)

}