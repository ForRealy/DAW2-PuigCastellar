import Persona from "./Persona";
export class Pacient extends Persona {
    constructor(malaltia, tractament, 
    //public tractament:typeof tractamentPacient(Oral !| Via || Intervencio),
    ingresat, nom, clase, id, cognoms) {
        super(nom, clase, cognoms, id);
        this.malaltia = malaltia;
        this.tractament = tractament;
        this.ingresat = ingresat;
    }
    mostrarInformacion() {
        return `
        ${this.nom}
        ${this.cognoms}
        ${this.malaltia}
        ${this.tractament}`;
    }
}
//# sourceMappingURL=Pacient.js.map