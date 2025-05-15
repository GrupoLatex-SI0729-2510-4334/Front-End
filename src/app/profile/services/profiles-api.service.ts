import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Profile } from '../model/profile.entity';

@Injectable({
  providedIn: 'root'
})
export class ProfilesApiService {
  private baseUrl: string = environment.serverBaseUrl;
  private profilesEndpoint: string = environment.profilesEndpointPath;

  constructor(private http: HttpClient) {}

  getProfileById(profileId: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}${this.profilesEndpoint}/${profileId}`);
  }

  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.baseUrl}${this.profilesEndpoint}/${profile.id}`, profile);
  }
}
