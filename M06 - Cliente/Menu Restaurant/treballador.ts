// treballador.ts
import { Persona } from './persona';

export class Treballador extends Persona {
    public dni: string;
    public torn: string;
    public càrrec: string;

    constructor(nom: string, cognoms: string, dni: string, torn: string, càrrec: string) {
        super(nom, cognoms);
        this.dni = dni;
        this.torn = torn;
        this.càrrec = càrrec;
    }

    mostrarInformacio(): string {
        const info = super.mostrarInformacio();
        return `${info}, DNI: ${this.dni}, Torn: ${this.torn}, Càrrec: ${this.càrrec}`;
    }
}
