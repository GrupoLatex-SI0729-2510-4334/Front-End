import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { PostulationService } from '../../services/postulation.service';
import { Postulation } from '../../model/postulation.entity';
import { environment } from '../../../../environments/environment';
import {DialogComponent} from '../../../evaluations/components/evaluations-function/dialog.component';

@Component({
  selector: 'app-postulations-details',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,




    NgIf
  ],
  templateUrl: './postulations-details.component.html',
  styleUrl: './postulations-details.component.css'
})
export class PostulationsDetailsComponent implements OnInit {
  postulationForm: FormGroup;
  isEditing: boolean = false;
  postulationId: number | undefined;
  eventId: number | undefined;
  eventTitle: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private postulationService: PostulationService,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.postulationForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      cellphone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      DNI: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      artisticName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Primero intentamos obtener el ID de postulación de la URL (modo edición)
    const postulationId = +this.route.snapshot.paramMap.get('postulationId')!;
    console.log(postulationId);
    if (!isNaN(postulationId) && postulationId > 0) {
      // Estamos en modo edición
      this.postulationService.getPostulationById(postulationId).subscribe((postulation) => {
        if (postulation) {
          this.isEditing = true;
          this.postulationId = postulation.id;
          this.eventId = postulation.eventId;
          this.postulationForm.patchValue(postulation);

          // Obtener el título del evento
          this.http.get(`${environment.serverBaseUrl}/events`).subscribe((events: any) => {
            const event = events.find((e: any) => e.event_id === this.eventId);
            this.eventTitle = event?.title;
          });
        }
      });
    } else {
      // Estamos en modo creación, obtenemos el eventId de los query params
      const eventId = +this.route.snapshot.queryParamMap.get('eventId')!;

      if (!isNaN(eventId) && eventId > 0) {
        this.eventId = eventId;

        // Obtener el título del evento
        this.http.get(`${environment.serverBaseUrl}/events`).subscribe((events: any) => {
          const event = events.find((e: any) => e.event_id === this.eventId);
          this.eventTitle = event?.title;
        });
      } else {
        // No hay eventId válido, mostrar error o redirigir
        this.dialog.open(DialogComponent, {
          data: { message: 'No se ha especificado un evento válido para la postulación.' }
        });
        this.router.navigate(['/events']);
      }
    }
  }

  savePostulation(): void {
    if (this.postulationForm.valid) {
      // Verificar que tenemos un eventId válido
      if (!this.eventId) {
        this.dialog.open(DialogComponent, {
          data: { message: 'No se ha especificado un evento para la postulación.' }
        });
        return;
      }

      // Verificar si ya existe una postulación para este evento (solo en modo creación)
      if (!this.isEditing) {
        this.postulationService.getPostulations().subscribe((postulations) => {
          const alreadyApplied = postulations.some(
            p => p.eventId === this.eventId &&
              // Puedes añadir más condiciones según tus requerimientos
              // Por ejemplo, verificar si tiene el mismo DNI o email
              (p.DNI === this.postulationForm.value.DNI ||
                p.email === this.postulationForm.value.email)
          );

          if (alreadyApplied) {
            this.dialog.open(DialogComponent, {
              data: { message: 'Ya existe una postulación para este evento con la misma información.' }
            });
          } else {
            this.submitPostulation();
          }
        });
      } else {
        // En modo edición, simplemente enviamos los datos
        this.submitPostulation();
      }
    } else {
      this.postulationForm.markAllAsTouched();
      this.dialog.open(DialogComponent, {
        data: { message: 'Por favor, completa todos los campos obligatorios correctamente.' }
      });
    }
  }

  private submitPostulation(): void {
    const postulation: Postulation = {
      id: this.postulationId || 0,
      eventId: this.eventId!,
      ...this.postulationForm.value
    };

    this.postulationService.savePostulation(postulation).subscribe(
      () => {
        this.dialog.open(DialogComponent, {
          data: { message: 'Postulación guardada correctamente.' }
        });
        this.router.navigate(['/postulations']);
      },
      (error) => {
        console.error('Error al guardar la postulación', error);
        this.dialog.open(DialogComponent, {
          data: { message: 'Error al guardar la postulación. Por favor, intenta nuevamente.' }
        });
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/postulations']);
  }
}
