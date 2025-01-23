import Persona from "./Persona";
export class Empleat extends Persona {
    constructor(carrec, incorporacio, actiu, llistaPacients, nom, clase, id, cognoms) {
        super(nom, clase, cognoms, id);
        this.carrec = carrec;
        this.incorporacio = incorporacio;
        this.actiu = actiu;
        this.llistaPacients = llistaPacients;
    }
    afegirPacient(Pacient) {
        this.llistaPacients.push();
    }
}
//# sourceMappingURL=Empleat.js.map