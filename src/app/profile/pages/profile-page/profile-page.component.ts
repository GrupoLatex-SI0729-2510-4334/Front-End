import {Component, OnInit} from '@angular/core';
import {ProfileFunctionComponent} from '../../components/profile-function/profile-function.component';
import {PortfolioListComponent} from '../../components/portfolio-list/portfolio-list.component';
import {
  ProfileReviewsFunctionComponent
} from '../../components/profile-reviews-function/profile-reviews-function.component';
import {Portfolio} from '../../model/portfolio.entity';
import {ProfilesApiService} from '../../services/profiles-api.service';

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
    this.profileService.getProfileById(1).subscribe(profile => {
      this.portfolios = profile.portfolio;
      console.log('Portfolios obtenidos:', this.portfolios);
    });
  }
}
