import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from '../../model/profile.entity';
import { ProfilesApiService } from '../../services/profiles-api.service';
import { MatButtonModule } from '@angular/material/button';
import {NgIf} from '@angular/common';
import { ProfileEditDialogComponent } from '../profile-edit-dialog/profile-edit-dialog.component';

@Component({
  selector: 'app-profile-function',
  imports: [MatCardModule, MatButtonModule, NgIf],
  templateUrl: './profile-function.component.html',
  styleUrl: './profile-function.component.css'
})
export class ProfileFunctionComponent implements OnInit {
  profile!: Profile;

  constructor(private profileService: ProfilesApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.profileService.getProfileById(1).subscribe((profile) => this.profile = profile);
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
}
