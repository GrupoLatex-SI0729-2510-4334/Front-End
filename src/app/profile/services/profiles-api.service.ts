import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Profile } from '../model/profile.entity';
import { Portfolio } from '../model/portfolio.entity';

@Injectable({
  providedIn: 'root'
})
export class ProfilesApiService {
  private baseUrl: string = environment.serverBaseUrl;
  private profilesEndpoint: string = environment.profilesEndpointPath;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getProfileById(profileId: number): Observable<Profile> {
    return this.http.get<Profile>(
      `${this.baseUrl}${this.profilesEndpoint}/${profileId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(
      `${this.baseUrl}${this.profilesEndpoint}/${profile.id}`,
      profile,
      { headers: this.getAuthHeaders() }
    );
  }

  getProfileByEmail(email: string): Observable<Profile> {
    return this.http.get<Profile>(
      `${this.baseUrl}${this.profilesEndpoint}/by-email?email=${encodeURIComponent(email)}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getAllProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(
      `${this.baseUrl}${this.profilesEndpoint}`,
      { headers: this.getAuthHeaders() }
    );
  }

  addPortfolioItem(profileId: number, portfolioItem: Portfolio): Observable<Portfolio[]> {
    return this.getProfileById(profileId).pipe(
      switchMap((profile) => {
        if (!profile.portfolio) {
          profile.portfolio = [];
        }
        profile.portfolio.push(portfolioItem);
        return this.updateProfile(profile).pipe(
          switchMap(updated => [updated.portfolio])
        );
      })
    );
  }
}
