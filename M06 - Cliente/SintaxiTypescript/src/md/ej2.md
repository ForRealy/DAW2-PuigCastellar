```
const maxVisits:number = 2; //Variable let para el maximo de visitas
const pageName:String = "Mi Pagina"; //Variable const para el nombre de la pagina
var visitCount:number = 0; //Variable var para el contador de visitas
let welcomeMesagge:String = "Bienbenido"; //Variable let para mensaje de bienvenida

visitCount++; //Contador que suma 1 siempre a visitCount
if (visitCount > maxVisits){ //Comparador del contador y el maximo de visitas
    welcomeMesagge = "error"; //Si se cumple la condicion cambiar el mensaje de bienvenida a error
    console.log(welcomeMesagge); //Sacar por consola welcomeMesagge
}else console.log(welcomeMesagge); //Sacar por consola welcomeMesagge

visitCount++;
if (visitCount > maxVisits){
    welcomeMesagge = "error";
    console.log(welcomeMesagge);
}else console.log(welcomeMesagge);

visitCount++;
if (visitCount > maxVisits){
    welcomeMesagge = "error";
    console.log(welcomeMesagge);
}else console.log(welcomeMesagge);

/*
Eh escojido 'let' para welcomeMesagge ya que cambio el contenido de este
en algun punto

Las variables maxVisits y pageName son 'const' ya que no se editan
en todo el codigo

visitCount es un 'var' porque se utiliza en muchos puntos del programa
y cambia constantemente
*/
```