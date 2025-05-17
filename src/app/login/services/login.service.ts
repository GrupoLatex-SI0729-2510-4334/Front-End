import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, switchMap} from 'rxjs';
import { Profile } from '../../profile/model/profile.entity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl: string = environment.serverBaseUrl;

  constructor(private http: HttpClient) {}

  register(profile: Profile, password: string): Observable<void> {
    return this.http.get<Profile[]>(`${this.baseUrl}/profiles`).pipe(
      map((profiles) => {
        const emailExists = profiles.some((p) => p.email === profile.email);
        if (emailExists) {
          throw new Error('El correo ya está registrado.');
        }
        return profile;
      }),
      switchMap(() => {
        const payload = { ...profile, password };
        return this.http.post<void>(`${this.baseUrl}/profiles`, payload);
      })
    );
  }

  login(email: string, password: string): Observable<Profile | null> {
    return this.http.get<Profile[]>(`${this.baseUrl}/profiles`).pipe(
      map((profiles) => profiles.find((p) => p.email === email && p.password === password) || null)
    );
  }
}
