import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Postulation } from '../model/postulation.entity';
import {Event} from '../../search/model/event.entity';

@Injectable({
  providedIn: 'root',
})
export class PostulationService {
  private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  filterEventsByGenre(genre: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}?preferred_genre=${genre}`);
  }
}

