export class Event {
  id: number;
  title: string;
  description: string;
  event_date: string;
  preferred_genre: string;
  tickets_link: string;
  rehearsal_required: boolean;
  genre: string;
  status: string;

  constructor() {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.event_date = '';
    this.preferred_genre = '';
    this.tickets_link = '';
    this.rehearsal_required = false;
    this.genre = '';
    this.status = '';
  }
}

export class Dashboard {}
