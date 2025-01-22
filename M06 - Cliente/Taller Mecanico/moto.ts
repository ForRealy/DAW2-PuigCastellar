import { veiculo } from "./veiculo";
import { fecha } from "./fecha";

export class moto extends veiculo implements fecha{
    public dia: number;
    public hora: Date;
    public type: string;
    
     constructor (ruedas: number, dia:number, hora: Date, type: string) {
        super (ruedas);
        this.dia = dia;
        this.hora = hora;
        this.type = type;
    }
}