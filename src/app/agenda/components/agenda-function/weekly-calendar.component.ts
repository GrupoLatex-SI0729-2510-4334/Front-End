import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {
  startOfWeek,
  addDays,
  format,
  isSameDay
} from 'date-fns';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { Event } from '../../model/dashboard.entity';

@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  imports: [
    NgForOf,
    DatePipe,
    NgIf
  ],
  styleUrls: ['./weekly-calendar.component.css']
})
export class WeeklyCalendarComponent implements OnInit {
  @Input() events: Event[] = [];
  @Output() dateSelected = new EventEmitter<Date>();
  currentWeekStart: Date = startOfWeek(new Date(), { weekStartsOn: 1 });
  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  weekDates: Date[] = [];
  weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  ngOnInit(): void {
    this.generateWeek();
  }

  generateWeek(): void {
    this.weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(this.currentWeekStart, i);
      this.weekDates.push(date);
    }
  }

  prevWeek(): void {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.generateWeek();
  }

  nextWeek(): void {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.generateWeek();
  }

  formatDate(date: Date): string {
    return format(date, 'dd');
  }

  getMonthYear(): string {
    return format(this.currentWeekStart, 'MMMM yyyy');
  }

  onDateClick(date: Date): void {
    this.selectedDate = date;
    this.dateSelected.emit(date);
    console.log('Fecha seleccionada:', date);
  }

  isSelected(date: Date): boolean {
    return this.selectedDate ? isSameDay(date, this.selectedDate) : false;
  }

  hasEvent(date: Date): boolean {
    return this.events.some(event => {
      const eventDate = new Date(event.event_date);
      return isSameDay(eventDate, date);
    });
  }
}
