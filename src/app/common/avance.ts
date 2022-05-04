import { Tema } from './tema';
import { User } from './user';
export class Avance {
  idAvance: bigint;
  user: User;
  tema: Tema;
  fechaCreacion: Date;

  constructor(idAvance: bigint, user: User, tema:Tema, fechaCreacion: Date) {
    this.idAvance = idAvance;
    this.user = user;
    this.tema = tema;
    this.fechaCreacion = fechaCreacion;
  }

}
