"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class reparacion {
    constructor() {
        this.horario = [];
    }
    reparacionEcha(resource) {
        this.horario.push(resource);
    }
    mostrarReparaciones(type) {
        return this.horario.filter(resource => resource.type === type);
    }
}
exports.default = reparacion;
//# sourceMappingURL=reparacion.js.map