import { Portfolio } from './portfolio.entity';

export class Profile {
  id: number;
  type: string;
  name: string;
  email: string;
  password: string;
  image: string;
  occupation: string;
  portfolio: Portfolio[];
  biography: string;

  constructor() {
    this.id = 0;
    this.type = '';
    this.name = '';
    this.email = '';
    this.password = '';
    this.image = '';
    this.occupation = '';
    this.portfolio = [];
    this.biography = '';
  }
}
