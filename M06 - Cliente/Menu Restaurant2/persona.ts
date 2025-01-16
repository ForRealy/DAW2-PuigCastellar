// persona.ts
export class Persona {
    public nom: string;
    public cognoms: string;

    constructor(nom: string, cognoms: string) {
        this.nom = nom;
        this.cognoms = cognoms;
    }

    mostrarInformacio(): string {
        return `${this.nom} ${this.cognoms}`;
    }
}
