//Definció comanda
class Comanda {
    constructor(plats) {
        this.type = "Comanda";
        this.plats = plats;
        this._id = Comanda._nextId++;
    }
    set setId(id) {
        this._id = id;
    }
    getId() {
        return this._id.toString();
    }
}
Comanda._nextId = 1;
export default Comanda;
//# sourceMappingURL=Comanda.js.map