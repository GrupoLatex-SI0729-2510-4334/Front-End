import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  ngOnInit(): void {
    this.loadEvaluatedEvents();
  }

  editEvaluation(evaluationId: number): void {
    this.router.navigate([`/evaluations/${evaluationId}`]);
  }

  deleteEvaluation(evaluationId: number): void {
    if (confirm('¿Estás seguro de que deseas borrar esta evaluación?')) {
      this.http.delete(`${environment.serverBaseUrl}/evaluations/${evaluationId}`, { headers: this.getAuthHeaders() }).subscribe({
        next: () => {
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
    this.http.get(`${environment.serverBaseUrl}/events`, { headers: this.getAuthHeaders() }).subscribe((events: any) => {
      const mappedEvents = events.map((e: any) => ({
        ...e,
        id: e.id ?? e.eventId ?? e.event_id
      }));
      this.http.get(`${environment.serverBaseUrl}/evaluations`, { headers: this.getAuthHeaders() }).subscribe((evaluations: any) => {
        this.evaluatedEvents = mappedEvents
          .map((event: any) => {
            const evaluation = evaluations.find((e: any) => e.eventId === event.id);
            return evaluation ? { ...event, evaluation } : null;
          })
          .filter((event: any) => event !== null);
      });
    });
  }
}
