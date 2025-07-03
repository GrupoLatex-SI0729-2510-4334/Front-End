import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from '../../model/profile.entity';
import { ProfilesApiService } from '../../services/profiles-api.service';
import { MatButtonModule } from '@angular/material/button';
import {NgIf} from '@angular/common';
import { ProfileEditDialogComponent } from '../profile-edit-dialog/profile-edit-dialog.component';
import {Router} from '@angular/router';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-profile-function',
  imports: [MatCardModule, MatButtonModule, NgIf, MatDivider],
  templateUrl: './profile-function.component.html',
  styleUrl: './profile-function.component.css'
})
export class ProfileFunctionComponent implements OnInit {
  profile!: Profile;

  constructor(private profileService: ProfilesApiService, private dialog: MatDialog, private router: Router) {}

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/blank']).then(() => {
      setTimeout(() => {
        window.location.reload();
        this.router.navigate(['/']);
      }, 500);
    });
  }

  ngOnInit(): void {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      const currentUser = JSON.parse(savedUser) as Profile;
      this.profileService.getProfileById(currentUser.id).subscribe((profile) => {
        this.profile = profile;
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  enableEdit(): void {
    const dialogRef = this.dialog.open(ProfileEditDialogComponent, {
      width: '400px',
      data: this.profile
    });

    dialogRef.afterClosed().subscribe((result: Profile | undefined) => {
      if (result) {
        this.profileService.updateProfile(result).subscribe((updatedProfile) => {
          this.profile = updatedProfile; // Actualiza el perfil local con los datos del servidor
        });
      }
    });
  }

  updatePortfolio(newItem: any): void {
    if (this.profile && this.profile.portfolio) {
      this.profile.portfolio.push(newItem);

      this.profileService.updateProfile(this.profile).subscribe({
        next: (updatedProfile) => {
          this.profile = updatedProfile; // Actualiza el perfil local con los datos del servidor
          console.log('Portafolio actualizado:', this.profile.portfolio);
        },
        error: (err) => {
          console.error('Error al actualizar el portafolio:', err);
        }
      });
    }
  }
}
