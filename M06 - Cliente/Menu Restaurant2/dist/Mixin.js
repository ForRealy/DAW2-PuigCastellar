import Client from './Client.js';
function LoggableMixin(Base) {
    return class extends Base {
        logAction(action) {
            console.log(`Acción: ${action}`);
        }
    };
}
class ClientAmbLog extends LoggableMixin(Client) {
    addComanda(comanda) {
        this.logAction(`Se ha añadido una nueva comanda al cliente ${this.nom}`);
    }
}
//# sourceMappingURL=Mixin.js.map