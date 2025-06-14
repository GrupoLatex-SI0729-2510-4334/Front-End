import { Component, OnInit } from '@angular/core';
//import {Event} from '../../../dashboard/model/dashboard.entity';
import { Event } from '../../model/dashboard.entity';
import { FormsModule } from '@angular/forms';
import { WeeklyCalendarComponent } from '../weekly-calendar/weekly-calendar.component';

import { CommonModule } from '@angular/common';
import { EventService } from '../../service/event-service/event.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [
    WeeklyCalendarComponent,
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  selector: 'app-agenda-function',
  styleUrl: './agenda-function.component.css',
  templateUrl: './agenda-function.component.html',
})
export class AgendaFunctionComponent implements OnInit {
  events: Event[] = [];
  filterEvents: Event[] = [];
  pageEvents: Event[] = [];

  //Variables para filtros
  selectedDate: Date | null = null;
  selectedGenres: string[] = [];
  genres: string[] = [];

  // Variables para la paginación
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
      this.filterEvents = [...this.events];
      // Inicializar géneros de forma aleatoria para pruebas
      this.genres = [
        'Salsa',
        'Punk',
        'Reguetón',
        'Cumbia',
        'Rock',
        'Jazz',
        'Clásica',
        'Electrónica',
        'Pop',
        'Blues',
        'Indie',
        'Country',
        'Flamenco',
      ].sort();
      console.log('Géneros inicializados:', this.genres);
      // Inicializar eventos para la paginación
      this.onUpdatePageEvent();
    });
  }

  applyFilters(): void {
    this.filterEvents = this.events.filter((event) => {
      const matchesGenre =
        this.selectedGenres.length === 0 ||
        this.selectedGenres.includes('todos') ||
        this.selectedGenres.includes(event.preferred_genre);

      const matchesDate = this.selectedDate
        ? new Date(event.event_date).toDateString() ===
          this.selectedDate.toDateString()
        : true;

      return matchesGenre && matchesDate;
    });

    if (this.filterEvents.length === 0) {
      this.noEventsMessage = 'No se encontraron eventos que coincidan con los filtros.';
    } else {
      this.noEventsMessage = '';
    }

    this.pageIndex = 0;
    this.onUpdatePageEvent();
    if (this.filterEvents.length === 0) {
      console.log('No se encontraron eventos que coincidan con los filtros.');
    }
  }

  onGenresChange(): void {
    if (this.selectedGenres.includes('todos')) {
      this.selectedGenres = ['todos'];
    }
  }

  resetFilters(): void {
    this.selectedGenres = [];
    this.selectedDate = null;
    this.filterEvents = [...this.events];
    this.pageIndex = 0;
    this.onUpdatePageEvent();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.onUpdatePageEvent();
  }

  onUpdatePageEvent() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pageEvents = this.filterEvents.slice(startIndex, endIndex);
  }

  cancelEvent(event: Event): void {
    console.log(`Cancelando evento: ${event.title}`);
    console.log('id del evento:', event.id);
    const updatedEvent = {
      ...event,
      status: 'Cancelado por el músico',
    };

    this.eventService.updateEvent(updatedEvent).subscribe({
      next: () => {
        event.status = 'Cancelado por el músico';
        console.log(`Evento cancelado: ${event.title}`);
      },
      error: (err) => {
        console.error('Error al cancelar el evento', err);
      },
    });
  }

  noEventsMessage: string='';

  onDateSelected(date: Date): void {
    console.log('Fecha seleccionada en el componente padre:', date);
    // buscar los eventos que coiniciden con la fecha seleccionada
    this.events = this.events.filter((event) => {
      const eventDate = new Date(event.event_date);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  }

  onFotoClick(eventId: number): void {
    console.log(`Abrir galería para el evento con ID: ${eventId}`);
    // Lógica personalizada para manejar fotos
  }

  onDocumentoClick(eventId: number): void {
    console.log(`Abrir documentos para el evento con ID: ${eventId}`);
    // Lógica personalizada para manejar documentos
  }

  onConfiguracionClick(eventId: number): void {
    console.log(`Abrir configuración para el evento con ID: ${eventId}`);
    // Lógica personalizada para manejar configuración
  }
}
