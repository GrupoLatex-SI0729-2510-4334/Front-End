export class Profile {
  id: number;
  type: string;
  name: string;
  email: string;
  image: string;
  occupation: string;
  biography: string;

  constructor() {
    this.id = 0;
    this.type = '';
    this.name = '';
    this.email = '';
    this.image = '';
    this.occupation = '';
    this.biography = '';
  }
}
