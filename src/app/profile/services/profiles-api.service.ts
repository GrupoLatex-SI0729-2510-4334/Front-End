import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import { environment } from '../../../environments/environment';
import { Profile } from '../model/profile.entity';
import {Portfolio} from '../model/portfolio.entity';

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
