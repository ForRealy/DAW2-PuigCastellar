import Identificable from './Identificable.js'

//Classe generica que utilitza una classe T que ha de heretar de Identificable
export default class GestioRecursos<T extends Identificable> {
    
    //Array d'entitats generica
    private resources: T[] = [];

    //Metode per afegir entitats generiques a la llista
    afegirRecurs(resource: T): void {
        this.resources.push(resource);
    }

    //Metode per mostrar les entitats de la llista demanada
    mostrarRecursos(type: string): T[] {
        return this.resources.filter(resource => resource.type === type);
    }
}