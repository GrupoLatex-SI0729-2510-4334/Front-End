import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Portfolio} from '../../model/portfolio.entity';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-add-portfolio-item-dialog',
  imports: [MatFormFieldModule, FormsModule, MatDialogModule, MatButtonModule, MatInputModule],
  templateUrl: './add-portfolio-item-dialog.component.html',
  styleUrl: './add-portfolio-item-dialog.component.css'
})
export class AddPortfolioItemDialogComponent {
  portfolioItem: Portfolio = new Portfolio();

  constructor(public dialogRef: MatDialogRef<AddPortfolioItemDialogComponent>) {}

  onSave(): void {
    this.dialogRef.close(this.portfolioItem);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
