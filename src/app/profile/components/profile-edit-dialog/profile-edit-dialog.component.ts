import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Profile } from '../../model/profile.entity';

@Component({
  selector: 'app-profile-edit-dialog',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatDialogModule, MatButtonModule],
  templateUrl: './profile-edit-dialog.component.html',
  styleUrl: './profile-edit-dialog.component.css'
})
export class ProfileEditDialogComponent {
  profile: Profile;

  constructor(
    public dialogRef: MatDialogRef<ProfileEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profile
  ) {
    this.profile = { ...data };
  }

  onSave(): void {
    this.dialogRef.close(this.profile);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
