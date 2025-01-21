// persona.ts
export abstract class Persona {
    public nom: string;
    public cognoms: string;

    constructor(nom: string, cognoms: string) {
        this.nom = nom;
        this.cognoms = cognoms;
    }

     abstract mostrarInformacio(): string ;
}
