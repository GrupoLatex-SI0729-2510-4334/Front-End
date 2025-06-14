import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-profile-reviews-function',
  imports: [
    MatButton
  ],
  templateUrl: './profile-reviews-function.component.html',
  styleUrl: './profile-reviews-function.component.css'
})
export class ProfileReviewsFunctionComponent {

  constructor(private router: Router) {
  }

  navigateToEvaluations(): void {
    this.router.navigate(['/evaluations']);
  }
}
