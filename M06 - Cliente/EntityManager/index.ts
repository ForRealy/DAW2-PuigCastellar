//Interface con el ID 
interface Identifiable {
    id: number;
}

//Interface con el nombre
interface Nameable {
    name: string;
}

function IdentifiableMixin<TBase extends new (...args: any[]) => {}>(Base: TBase) {
    return class extends Base implements Identifiable {
        id: number = 0; 
    };
}

function NameableMixin<TBase extends new (...args: any[]) => {}>(Base: TBase) {
    return class extends Base implements Nameable{
        name: string = "Unnamed"; 
    };
}

abstract class BaseEntity<T extends Identifiable & Nameable> {
    constructor(public entity: T) {}

    logProperty<K extends keyof T>(key: K): void {
        console.log(`The value of ${key.toString()} is:`, this.entity[key]);
    }
}

class BasicEntity {}

//TODO