import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatLabel} from '@angular/material/input';
import {EvaluationsEntity} from '../../model/evaluations.entity';
import {EvaluationsServices} from '../../services/evaluations.services';
import {NgIf} from '@angular/common';
import {DialogComponent} from './dialog.component';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-evaluations-function',
  standalone: true,
  imports: [
    MatCardTitle,
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatFormField,
    MatFormField,
    MatFormField,
    MatCheckbox,
    MatInput,
    MatCardActions,
    MatButton,
    NgIf
  ],
  templateUrl: './evaluations-function.component.html',
  styleUrl: './evaluations-function.component.css'
})

export class EvaluationsFunctionComponent implements OnInit {
  evaluationForm!: FormGroup;
  eventTitle: string = '';
  eventId?: number;
  evaluationId?: number;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private evaluationsService: EvaluationsServices
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  ngOnInit(): void {
    this.evaluationForm = this.fb.group({
      rating: [1, [Validators.required, Validators.min(1)]],
      comment: ['', Validators.required],
      checklist: this.fb.group({
        punctualPayment: [false],
        goodCommunication: [false],
        respectedContract: [false]
      })
    });

    this.route.paramMap.subscribe(params => {
      const evaluationId = params.get('evaluationId');
      if (evaluationId === 'new') {
        this.route.queryParamMap.subscribe(queryParams => {
          const eventIdParam = queryParams.get('eventId');
          if (eventIdParam) {
            this.eventId = Number(eventIdParam);
            this.http.get<any[]>(`${environment.serverBaseUrl}/events`, { headers: this.getAuthHeaders() })
              .subscribe(events => {
                const event = events.find(e => Number(e.id) === this.eventId);
                this.eventTitle = event ? event.title : '';
              });
          } else {
            this.eventId = undefined;
            this.eventTitle = '';
          }
        });
      } else {
        this.http.get<any>(`${environment.serverBaseUrl}/evaluations/${evaluationId}`, { headers: this.getAuthHeaders() })
          .subscribe(evaluation => {
            this.eventId = evaluation.eventId;
            this.http.get<any[]>(`${environment.serverBaseUrl}/events`, { headers: this.getAuthHeaders() })
              .subscribe(events => {
                const event = events.find(e => Number(e.id) === this.eventId);
                this.eventTitle = event ? event.title : '';
              });
            this.evaluationForm.patchValue({
              rating: evaluation.rating,
              comment: evaluation.comment,
              checklist: {
                punctualPayment: evaluation.checklist.punctualPayment,
                goodCommunication: evaluation.checklist.goodCommunication,
                respectedContract: evaluation.checklist.respectedContract
              }
            });
          });
      }
    });
  }

  saveEvaluation(evaluation: EvaluationsEntity) {
    return this.http.post(
      `${environment.serverBaseUrl}/evaluations`,
      {
        eventId: evaluation.eventId,
        rating: evaluation.rating,
        comment: evaluation.comment,
        punctualPayment: evaluation.checklist.punctualPayment,
        goodCommunication: evaluation.checklist.goodCommunication,
        respectedContract: evaluation.checklist.respectedContract
      },
      { headers: this.getAuthHeaders() }
    );
  }
  onSaveEvaluation(): void {
    if (!this.eventId) {
      alert('No se pudo identificar el evento a evaluar. Intenta nuevamente.');
      return;
    }
    if (this.evaluationForm.invalid) {
      this.evaluationForm.markAllAsTouched();
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    const formValue = this.evaluationForm.value;
    const evaluation: EvaluationsEntity = {
      id: this.evaluationId ?? 0,
      eventId: this.eventId,
      rating: formValue.rating,
      comment: formValue.comment,
      checklist: {
        punctualPayment: formValue.checklist.punctualPayment,
        goodCommunication: formValue.checklist.goodCommunication,
        respectedContract: formValue.checklist.respectedContract
      }
    };

    if (this.isEditMode && this.evaluationId) {
      this.evaluationsService.deleteEvaluation(this.evaluationId).subscribe({
        next: () => {
          this.evaluationsService.saveEvaluation(evaluation).subscribe({
            next: () => {
              alert('Evaluación actualizada correctamente.');
              this.router.navigate(['/evaluated-events']);
            },
            error: (err) => {
              alert('Error al guardar la evaluación: ' + (err?.error?.message || err.message));
            }
          });
        },
        error: (err) => {
          alert('Error al borrar la evaluación original: ' + (err?.error?.message || err.message));
        }
      });
    } else {
      this.evaluationsService.saveEvaluation(evaluation).subscribe({
        next: () => {
          alert('Evaluación guardada correctamente.');
          this.router.navigate(['/evaluated-events']);
        },
        error: (err) => {
          alert('Error al guardar la evaluación: ' + (err?.error?.message || err.message));
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/evaluated-events']);
  }
}
