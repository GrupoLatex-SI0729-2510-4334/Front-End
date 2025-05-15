import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { Event } from '../../model/event.entity';

@Component({
  selector: 'app-search-function',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule aquí
  templateUrl: './search-function.component.html',
  styleUrls: ['./search-function.component.css'],
})
export class SearchFunctionComponent {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  genres: string[] = ['Rock', 'Jazz', 'Electrónica', 'Clásica', 'Pop', 'Reggae', 'Hip-Hop', 'Salsa', 'Indie', 'Blues', 'Country', 'Flamenco'];  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.loadEvents();
  }
  showMoreInfo(event: Event): void {
    if (event.tickets_link) {
      window.open(event.tickets_link, '_blank');
    } else {
      alert('No hay información adicional disponible para este evento.');
    }
  }

  postulate(event: Event): void {
    alert(`Has seleccionado postular para: ${event.title}`);
  }

  loadEvents(): void {
    this.searchService.getEvents().subscribe((data) => {
      this.events = data;
      this.filteredEvents = data;
    });
  }

  filterByGenre(genre: string): void {
    if (genre) {
      this.searchService.filterEventsByGenre(genre).subscribe((data) => {
        this.filteredEvents = data;
      });
    } else {
      this.filteredEvents = this.events;
    }
  }
}
