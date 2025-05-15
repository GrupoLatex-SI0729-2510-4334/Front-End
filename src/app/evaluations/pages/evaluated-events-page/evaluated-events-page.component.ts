import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-evaluated-events-page',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    DatePipe,
    NgForOf,
    NgIf,
    MatButton,
    RouterLink,
    MatCardActions
  ],
  templateUrl: './evaluated-events-page.component.html',
  styleUrl: './evaluated-events-page.component.css'
})

export class EvaluatedEventsPageComponent implements OnInit {
  evaluatedEvents: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadEvaluatedEvents();
  }

  editEvaluation(evaluationId: number): void {
    this.router.navigate([`/evaluations/${evaluationId}`]);
  }

  deleteEvaluation(evaluationId: number): void {
    if (confirm('¿Estás seguro de que deseas borrar esta evaluación?')) {
      this.http.delete(`${environment.serverBaseUrl}/evaluations/${evaluationId}`).subscribe({
        next: () => {
          // Actualizar la lista local eliminando el evento evaluado correspondiente
          this.evaluatedEvents = this.evaluatedEvents.filter(event => event.evaluation.id !== evaluationId);
          alert('Evaluación eliminada correctamente.');
        },
        error: (err) => {
          console.error('Error al eliminar la evaluación:', err);
          alert('Hubo un error al intentar eliminar la evaluación.');
        }
      });
    }
  }

  loadEvaluatedEvents(): void {
    this.http.get(`${environment.serverBaseUrl}/events`).subscribe((events: any) => {
      this.http.get(`${environment.serverBaseUrl}/evaluations`).subscribe((evaluations: any) => {
        this.evaluatedEvents = events
          .map((event: any) => {
            const evaluation = evaluations.find((e: any) => e.eventId === event.event_id);
            return evaluation ? { ...event, evaluation } : null;
          })
          .filter((event: any) => event !== null);
      });
    });
  }
}
