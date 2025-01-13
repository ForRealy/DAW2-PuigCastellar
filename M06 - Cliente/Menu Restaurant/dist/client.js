// client.ts
import { Persona } from './persona';
export class Client extends Persona {
    constructor(nom, cognoms) {
        super(nom, cognoms);
        this.comandes = [];
    }
    afegirComanda(comanda) {
        this.comandes.push(comanda);
    }
    mostrarInformacio() {
        const info = super.mostrarInformacio();
        return `${info} ha realitzat ${this.comandes.length} comanda(s).`;
    }
}
