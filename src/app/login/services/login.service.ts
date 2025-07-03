import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Profile } from '../../profile/model/profile.entity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl: string = environment.serverBaseUrl;

  constructor(private http: HttpClient) {}

  register(profile: Profile, password: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/register`, {
      name: profile.name,
      email: profile.email,
      password: password,
      role: profile.type
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, { email, password }).pipe(
      map((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          return response;
        }
        return null;
      })
    );
  }
}
