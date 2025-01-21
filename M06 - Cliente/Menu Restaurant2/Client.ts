// client.ts
import { Persona } from './persona';
interface Identificable{
    tipus: string;
    getId(): string;
}
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
        const info = this.mostrarInformacio();
        return `${info} ha realitzat ${this.comandes.length} comanda(s).`;
    }
}
