
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Postulation } from '../model/postulation.entity';

@Injectable({
  providedIn: 'root',
})
export class PostulationService {
  private baseUrl = `${environment.serverBaseUrl}/postulations`;

  constructor(private http: HttpClient) {}

  getPostulations(): Observable<Postulation[]> {
    return this.http.get<Postulation[]>(this.baseUrl).pipe(
      tap(data => console.log('Postulaciones obtenidas:', data.length)),
      catchError(this.handleError)
    );
  }

  getPostulationById(id: number): Observable<Postulation> {
    return this.http.get<Postulation>(`${this.baseUrl}/${id}`).pipe(
      tap(data => console.log('Postulación obtenida:', data)),
      catchError(this.handleError)
    );
  }

  savePostulation(postulation: Postulation): Observable<Postulation> {
    if (postulation.id === 0) {
      // Si no tiene ID, es una nueva postulación (POST)
      return this.http.post<Postulation>(this.baseUrl, postulation).pipe(
        tap(data => console.log('Postulación creada:', data)),
        catchError(this.handleError)
      );
    } else {
      // Si tiene ID, es una actualización (PUT)
      return this.http.put<Postulation>(`${this.baseUrl}/${postulation.id}`, postulation).pipe(
        tap(data => console.log('Postulación actualizada:', data)),
        catchError(this.handleError)
      );
    }
  }

  deletePostulation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => console.log('Postulación eliminada:', id)),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${err.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${err.status}, mensaje: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
