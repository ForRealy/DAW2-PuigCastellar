export default class Persona {
    constructor(nom, cognoms, clase, id) {
        this.nom = nom;
        this.cognoms = cognoms;
        this.clase = clase;
        this.id = id;
    }
    get value() {
        return `
        ${this.nom}
        ${this.cognoms}`;
    }
    set value(v) {
        this.nom = v;
        this.cognoms = v;
    }
    mostrarInformacion() {
        return `
        ${this.nom}
        ${this.cognoms}`;
    }
}
//# sourceMappingURL=Persona.js.map