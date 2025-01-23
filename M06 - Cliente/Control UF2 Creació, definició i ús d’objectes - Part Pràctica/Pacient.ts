import Persona from "./Persona";

export class Pacient extends Persona{
    constructor(
        public malaltia: string,
        public tractament: string,
        //public tractament:typeof tractamentPacient(Oral !| Via || Intervencio),
        public ingresat: boolean,

        nom: string,
        clase: string,
        id: number,
        cognoms: string
    ){
        super(nom, clase, cognoms, id)
    }
    public mostrarInformacion(): string {
        return `
        ${this.nom}
        ${this.cognoms}
        ${this.malaltia}
        ${this.tractament}`
    }
}