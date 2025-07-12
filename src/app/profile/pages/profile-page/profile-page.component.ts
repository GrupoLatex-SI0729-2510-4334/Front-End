import { Component, OnInit } from '@angular/core';
import { ProfileFunctionComponent } from '../../components/profile-function/profile-function.component';
import { PortfolioListComponent } from '../../components/portfolio-list/portfolio-list.component';
import { ProfileReviewsFunctionComponent } from '../../components/profile-reviews-function/profile-reviews-function.component';
import { Portfolio } from '../../model/portfolio.entity';
import { ProfilesApiService } from '../../services/profiles-api.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileFunctionComponent,
    PortfolioListComponent,
    ProfileReviewsFunctionComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  portfolios: Array<Portfolio> = [];

  constructor(private profileService: ProfilesApiService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.portfolios = [];
      return;
    }

    let email = '';
    try {
      const decoded: any = jwtDecode(token);
      email = decoded.email;
    } catch {
      alert('Token inválido. Por favor, inicia sesión de nuevo.');
      this.portfolios = [];
      return;
    }

    this.profileService.getProfileByEmail(email).subscribe({
      next: (profile) => {
        this.portfolios = profile.portfolio || [];
      },
      error: () => {
        alert('No se encontró tu perfil.');
        this.portfolios = [];
      }
    });
  }
}
