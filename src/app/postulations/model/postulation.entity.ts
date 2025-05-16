export class Postulation {
  id: number;
  eventId: number;  // Añadido para vincular con el evento
  name: string;
  lastName: string;
  DNI: string;
  cellphone: string;
  address: string;
  email: string;
  artisticName: string;

  constructor() {
    this.id = 0;
    this.eventId = 0;
    this.name = '';
    this.lastName = '';
    this.DNI = '';
    this.cellphone = '';
    this.address = '';
    this.email = '';
    this.artisticName = '';
  }
}
