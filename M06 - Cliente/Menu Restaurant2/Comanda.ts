import Identificable from './Identificable.js'

//Declaracio classe Comanda que implementa Identificable
export default class Comanda implements Identificable {

    //Propietats Client
    public plats: string
    private _id: number

    //Propietat de interface
    public type: string = "Comanda";

    //Propietat estatica per controlar els id
    private static _nextId: number = 1;

    constructor(plats: string) {
      this.plats = plats;
      this._id = Comanda._nextId++;
    }

    set setId(id: number) {
      this._id = id;
    }

    //Metode de interface
    getId(): string {
      return this._id.toString();
    }
  }