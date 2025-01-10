export class persona {
    public name: string;
    public lastName: string;
    public dni: string;
 
 
    constructor(name: string, lastName: string, dni:string) {
     this.name = name;
     this.lastName = lastName;
     this.dni = dni
   }
 
   mostrarInformacio(name:string, lastName:string) {
     console.log(name, lastName)
   }
}