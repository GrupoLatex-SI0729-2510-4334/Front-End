import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { DatePipe, NgForOf } from '@angular/common';
import { environment } from '../../../../environments/environment';

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

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  ngOnInit(): void {
    this.http.get(`${environment.serverBaseUrl}/events`, { headers: this.getAuthHeaders() }).subscribe((data: any) => {
      this.events = data.map((e: any) => ({
        ...e,
        id: e.id ?? e.eventId ?? e.event_id
      }));
    });
  }

  evaluate(eventId: number): void {
    this.router.navigate(['/evaluations', 'new'], { queryParams: { eventId } });
  }
}
