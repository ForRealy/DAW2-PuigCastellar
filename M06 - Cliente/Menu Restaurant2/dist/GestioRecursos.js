export default class GestioRecursos {
    constructor() {
        this.resources = [];
    }
    afegirRecurs(resource) {
        this.resources.push(resource);
    }
    mostrarRecursos(type) {
        return this.resources.filter(resource => resource.type === type);
    }
}
//# sourceMappingURL=GestioRecursos.js.map