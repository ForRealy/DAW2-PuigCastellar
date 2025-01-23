import Persona from "./Persona";
import { Pacient } from "./Pacient";

export class Empleat extends Persona{
    constructor(
        public carrec: string,
        public incorporacio: Date,
        public actiu: boolean,
        public llistaPacients: [],
        nom: string,
        clase: string,
        id: number,
        cognoms: string
    ){
        super(nom, clase, cognoms, id)
    }
    
    public afegirPacient(Pacient: Pacient): void{
        this.llistaPacients.push();
    }
}