export class AvanceDto {
  idAvance: bigint;
  idUser: bigint;
  idTema: bigint;
  fechaCreacion: Date;

  constructor(idUser: bigint, idTema: bigint) {
    this.idUser = idUser;
    this.idTema = idTema;
  }

}
