import { Component,OnInit  } from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { Event } from '../../model/dashboard.entity';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import {RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {WeeklyCalendarComponent} from './weekly-calendar.component';

@Component({
  selector: 'app-agenda-function',
  imports: [
    DatePipe,
    RouterOutlet,
    MatToolbar,
    WeeklyCalendarComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './agenda-function.component.html',
  styleUrl: './agenda-function.component.css'
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
}

