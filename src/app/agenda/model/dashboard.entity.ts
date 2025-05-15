
export class Event {
  event_id: number;
  title: string;
  description: string;
  event_date: string;
  preferred_genre: string;
  tickets_link: string;
  rehearsal_required: boolean;

  constructor() {
    this.event_id = 0;
    this.title = '';
    this.description = '';
    this.event_date = '';
    this.preferred_genre = '';
    this.tickets_link = '';
    this.rehearsal_required = false;
  }
}



