"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coche = void 0;
const veiculo_1 = require("./veiculo");
class coche extends veiculo_1.veiculo {
    constructor(ruedas, dia, hora, type) {
        super(ruedas);
        this.dia = dia;
        this.hora = hora;
        this.type = type;
    }
}
exports.coche = coche;
//# sourceMappingURL=coche.js.map