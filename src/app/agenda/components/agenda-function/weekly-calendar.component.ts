import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  startOfWeek,
  addWeeks,
  addDays,
  format,
  isSameDay
} from 'date-fns';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./weekly-calendar.component.css']
})
export class WeeklyCalendarComponent implements OnInit {
  @Output() dateSelected = new EventEmitter<Date>();
  currentWeekStart: Date = startOfWeek(new Date(), { weekStartsOn: 1 });
  selectedDate: Date | null = null;
  weekDates: Date[] = [];
  weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  ngOnInit(): void {
    this.generateWeek();
  }

  generateWeek(): void {
    this.weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(this.currentWeekStart);
      date.setDate(this.currentWeekStart.getDate() + i);
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
}
