"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moto = void 0;
const veiculo_1 = require("./veiculo");
class moto extends veiculo_1.veiculo {
    constructor(ruedas, dia, hora, type) {
        super(ruedas);
        this.dia = dia;
        this.hora = hora;
        this.type = type;
    }
}
exports.moto = moto;
//# sourceMappingURL=moto.js.map