// client.ts
import { Persona } from './persona.js';

export class Client extends Persona {
    private comandes: string[];

    constructor(nom: string, cognoms: string) {
        super(nom, cognoms);
        this.comandes = [];
    }

    afegirComanda(comanda: string): void {
        this.comandes.push(comanda);
    }

    mostrarInformacio(): string {
        const info = super.mostrarInformacio();
        return `${info} ha realitzat ${this.comandes.length} comanda(s).`;
    }
}
