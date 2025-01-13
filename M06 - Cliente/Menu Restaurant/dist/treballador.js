// treballador.ts
import { Persona } from './persona';
export class Treballador extends Persona {
    constructor(nom, cognoms, dni, torn, càrrec) {
        super(nom, cognoms);
        this.dni = dni;
        this.torn = torn;
        this.càrrec = càrrec;
    }
    mostrarInformacio() {
        const info = super.mostrarInformacio();
        return `${info}, DNI: ${this.dni}, Torn: ${this.torn}, Càrrec: ${this.càrrec}`;
    }
}
