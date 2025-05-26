import { Component,OnInit  } from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { Event } from '../../model/dashboard.entity';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import {WeeklyCalendarComponent} from './weekly-calendar.component';

@Component({
  imports: [
    DatePipe,
    WeeklyCalendarComponent,
    NgForOf,
    NgIf
  ],
  selector: 'app-agenda-function',
  styleUrl: './agenda-function.component.css',
  templateUrl: './agenda-function.component.html'
})
export class AgendaFunctionComponent implements OnInit{
  events: Event[] = [];
  eventsFiltered: Event[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
    });
  }

  onDateSelected(date: Date): void {
    console.log('Fecha seleccionada en el componente padre:', date);
    // buscar los eventos que coiniciden con la fecha seleccionada
    this.eventsFiltered = this.events.filter(event => {
      const eventDate = new Date(event.event_date);
      return eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate();
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
