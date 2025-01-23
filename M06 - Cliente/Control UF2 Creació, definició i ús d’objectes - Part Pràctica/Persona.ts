import { Identificable } from "./Identificable";

export default abstract class Persona implements Identificable{
        
    constructor(
        protected nom: string,
        protected cognoms: string,
        public clase:string,
        public id:number
        
    ) {}
    public get value() : string {
        return `
        ${this.nom}
        ${this.cognoms}`
    } 
    public set value(v : string) {
        this.nom = v;
        this.cognoms = v
    }
    mostrarInformacion():string{
        return `
        ${this.nom}
        ${this.cognoms}`
    }
}
