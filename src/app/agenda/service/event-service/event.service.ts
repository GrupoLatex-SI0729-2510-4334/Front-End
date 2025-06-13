import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Event } from '../../model/dashboard.entity';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = `${environment.serverBaseUrl}/events`;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  updateEvent(event: Event): Observable<Event> {
    const url = `${this.apiUrl}/${event.id}`;
    return this.http.put<Event>(url, event);
  }
}
