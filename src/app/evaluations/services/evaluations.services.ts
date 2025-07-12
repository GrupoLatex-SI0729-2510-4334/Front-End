import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EvaluationsEntity } from '../model/evaluations.entity';
import { environment } from '../../../environments/environment';
import {EvaluationsAssembler} from './evaluations.assembler';

@Injectable({
  providedIn: 'root',
})
export class EvaluationsServices {
  private baseUrl = `${environment.serverBaseUrl}/evaluations`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  deleteEvaluation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getEvaluations(): Observable<EvaluationsEntity[]> {
    return this.http.get<EvaluationsEntity[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  saveEvaluation(evaluation: EvaluationsEntity): Observable<EvaluationsEntity> {
    const dto = EvaluationsAssembler.toDto(evaluation);
    return this.http.post<EvaluationsEntity>(this.baseUrl, dto, { headers: this.getAuthHeaders() });
  }

  updateEvaluation(id: number, evaluation: EvaluationsEntity): Observable<void> {
    const dto = EvaluationsAssembler.toDto(evaluation);
    return this.http.put<void>(`${this.baseUrl}/${id}`, dto, { headers: this.getAuthHeaders() });
  }
}
