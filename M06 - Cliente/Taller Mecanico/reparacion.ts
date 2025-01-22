import { fecha } from "./fecha";


export default class reparacion <T extends fecha> {
    private horario: T[] = [];
    
    reparacionEcha(resource: T): void {
        this.horario.push(resource);
    }

    mostrarReparaciones(type: string): T[] {
        return this.horario.filter(resource => resource.type === type);
    }
}   