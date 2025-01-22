import Persona from './Persona.js'
import Comanda from './Comanda.js'
import Identificable from './Identificable.js'

//Declaracio classe Client que hereta de persona i implementa Identificable
export default class Client extends Persona implements Identificable {

  //Propietats Client
  public comandes: Comanda[];
  private _credit: number;

  //Propietat de interface
  public type: string = "Client";

  //Constructor que utilitza part del pare
  constructor(nom: string, cognoms: string, dni: string, credit: number) {
    super(nom, cognoms, dni);
    this._credit = credit;
    this.comandes = [];
  }

  //Metode de interface
  getId(): string {
    return this.getDni;
  }

  get getCredit(): number {
    return this._credit;
  }

  set setCredit(credit: number) {
    this._credit = credit;
  }

  //Rep una comanda i la guarda a la llista de la instancia
  public afegirComanda(comanda: Comanda): void {
    this.comandes.push(comanda);
  }

  //Mostra les comandes de la instancia
  public mostrarComandes(): string {
    let resultat: string = "";

    this.comandes.forEach(comanda => {
      resultat += comanda.plats + "\n";
    });

    return resultat;
  }

  //Metode abstracte que hereta i implementa
  public mostrarInformacio() {
    console.log(this.nom + " " + this.cognoms + ", Comandes: " + this.comandes.length);
  }
}