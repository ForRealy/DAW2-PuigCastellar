// persona.ts
export class Persona {
    constructor(nom, cognoms) {
        this.nom = nom;
        this.cognoms = cognoms;
    }
    mostrarInformacio() {
        return `${this.nom} ${this.cognoms}`;
    }
}
