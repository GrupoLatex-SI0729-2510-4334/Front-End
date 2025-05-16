import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {DatePipe, NgForOf} from '@angular/common';
import {environment} from '../../../../environments/environment';


@Component({
  selector: 'app-evaluations-page',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardActions,
    MatCardContent,
    MatButton,
    DatePipe,
    NgForOf,
    RouterLink
  ],
  templateUrl: './evaluations-page.component.html',
  styleUrl: './evaluations-page.component.css'
})

export class EvaluationsPageComponent implements OnInit {
  events: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get(`${environment.serverBaseUrl}/events`).subscribe((data: any) => {
      this.events = data;
    });
  }

  evaluate(eventId: number): void {
    this.http.get(`${environment.serverBaseUrl}/evaluations`).subscribe((evaluations: any) => {
      const evaluation = evaluations.find((e: any) => e.eventId === eventId);
      if (evaluation) {
        this.router.navigate([`/evaluations/${evaluation.id}`]);
      } else {
        this.router.navigate([`/evaluations/new`], { queryParams: { eventId } });
      }
    });
  }
}
