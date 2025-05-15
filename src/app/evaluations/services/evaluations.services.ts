import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EvaluationsEntity } from '../model/evaluations.entity';
import { environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EvaluationsServices {
  private baseUrl = `${environment.serverBaseUrl}/evaluations`;

  constructor(private http: HttpClient) {}

  getEvaluations(): Observable<EvaluationsEntity[]> {
    return this.http.get<EvaluationsEntity[]>(this.baseUrl);
  }

  saveEvaluation(evaluation: EvaluationsEntity): Observable<void> {
    return this.http.post<void>(this.baseUrl, evaluation);
  }

  updateEvaluation(id: number, evaluation: EvaluationsEntity): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, evaluation);
  }
}
