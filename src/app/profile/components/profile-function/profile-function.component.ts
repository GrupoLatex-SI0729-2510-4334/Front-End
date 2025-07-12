import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from '../../model/profile.entity';
import { ProfilesApiService } from '../../services/profiles-api.service';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { ProfileEditDialogComponent } from '../profile-edit-dialog/profile-edit-dialog.component';
import { Router } from '@angular/router';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-profile-function',
  imports: [MatCardModule, MatButtonModule, NgIf, MatDivider],
  templateUrl: './profile-function.component.html',
  styleUrl: './profile-function.component.css'
})
export class ProfileFunctionComponent implements OnInit {
  profile!: Profile;

  constructor(private profileService: ProfilesApiService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const email = decoded.email;
        if (email) {
          this.profileService.getProfileByEmail(email).subscribe({
            next: (profile) => {
              this.profile = profile;
            },
            error: () => {
              alert('No se encontró tu perfil. Por favor, contacta al soporte.');
            }
          });
        } else {
          alert('Token inválido. Por favor, inicia sesión de nuevo.');
          this.router.navigate(['/']);
        }
      } catch (e) {
        alert('Token inválido. Por favor, inicia sesión de nuevo.');
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/blank']).then(() => {
      setTimeout(() => {
        window.location.reload();
        this.router.navigate(['/']);
      }, 500);
    });
  }

  enableEdit(): void {
    const dialogRef = this.dialog.open(ProfileEditDialogComponent, {
      width: '400px',
      data: this.profile
    });

    dialogRef.afterClosed().subscribe((result: Profile | undefined) => {
      if (result) {
        this.profileService.updateProfile(result).subscribe(() => {
          localStorage.removeItem('token');
          this.router.navigate(['/blank']).then(() => {
            setTimeout(() => {
              window.location.reload();
              this.router.navigate(['/']);
            }, 500);
          });
        });
      }
    });
  }

  updatePortfolio(newItem: any): void {
    if (this.profile && this.profile.portfolio) {
      this.profile.portfolio.push(newItem);

      this.profileService.updateProfile(this.profile).subscribe({
        next: (updatedProfile) => {
          this.profile = updatedProfile;
          console.log('Portafolio actualizado:', this.profile.portfolio);
        },
        error: (err) => {
          console.error('Error al actualizar el portafolio:', err);
        }
      });
    }
  }
}
