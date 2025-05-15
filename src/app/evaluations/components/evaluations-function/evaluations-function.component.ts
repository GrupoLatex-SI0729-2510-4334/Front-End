import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  evaluationForm: FormGroup;
  eventTitle: string | undefined;
  eventId: number | undefined;
  isEditing: boolean = false;
  evaluationId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private evaluationsService: EvaluationsServices,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.evaluationForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1)]],
      comment: ['', Validators.required],
      checklist: this.fb.group({
        punctualPayment: [false],
        goodCommunication: [false],
        respectedContract: [false],
      }),
    });
  }

  cancel(): void {
    this.router.navigate(['/evaluations']);
  }

  ngOnInit(): void {
    const evaluationId = +this.route.snapshot.paramMap.get('evaluationId')!;
    if (!isNaN(evaluationId)) {
      this.evaluationsService.getEvaluations().subscribe((evaluations) => {
        const evaluation = evaluations.find((e) => e.id === evaluationId);
        if (evaluation) {
          this.isEditing = true;
          this.evaluationId = evaluation.id;
          this.eventId = evaluation.eventId;
          this.evaluationForm.patchValue(evaluation);

          this.http.get(`${environment.serverBaseUrl}/events`).subscribe((events: any) => {
            const event = events.find((e: any) => e.event_id === this.eventId);
            this.eventTitle = event?.title;
          });
        }
      });
    } else {
      const eventId = +this.route.snapshot.queryParamMap.get('eventId')!;
      this.eventId = eventId;
      this.http.get(`${environment.serverBaseUrl}/events`).subscribe((events: any) => {
        const event = events.find((e: any) => e.event_id === this.eventId);
        this.eventTitle = event?.title;
      });
    }
  }

  saveEvaluation(): void {
    if (this.evaluationForm.valid) {
      this.evaluationsService.getEvaluations().subscribe((evaluations) => {
        const alreadyEvaluated = evaluations.some(
          (evaluation) =>
            evaluation.eventId === this.eventId &&
            evaluation.id !== this.evaluationId // Permitir si es la misma evaluación
        );

        if (alreadyEvaluated) {
          this.dialog.open(DialogComponent, {
            data: { message: 'Este evento ya ha sido evaluado.' }
          });
        } else {
          const evaluation = {
            eventId: this.eventId,
            ...this.evaluationForm.value,
          };

          if (this.isEditing) {
            this.evaluationsService.updateEvaluation(this.evaluationId!, evaluation).subscribe(() => {
              this.router.navigate(['/evaluations']);
            });
          } else {
            this.evaluationsService.saveEvaluation(evaluation).subscribe(() => {
              this.router.navigate(['/evaluations']);
            });
          }
        }
      });
    } else {
      this.evaluationForm.markAllAsTouched();
      this.dialog.open(DialogComponent, {
        data: { message: 'Por favor, completa todos los campos obligatorios.' }
      });
    }
  }
}
