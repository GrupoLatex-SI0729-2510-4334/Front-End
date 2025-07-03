import {Component, Input, OnInit} from '@angular/core';
import { Portfolio } from '../../model/portfolio.entity';
import { PortfolioItemComponent } from '../portfolio-item/portfolio-item.component';
import {NgForOf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import { AddPortfolioItemDialogComponent } from '../add-portfolio-item-dialog/add-portfolio-item-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import {ProfilesApiService} from '../../services/profiles-api.service';

@Component({
  selector: 'app-portfolio-list',
  imports: [PortfolioItemComponent, NgForOf, MatButtonModule],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.css'
})
export class PortfolioListComponent implements OnInit {
  @Input() profileId!: number;
  @Input() portfolios: Array<Portfolio> = [];

  constructor(private dialog: MatDialog, private profileService: ProfilesApiService) {}

  ngOnInit(): void {
    console.log('Portfolio:', this.portfolios);
  }

  trackByTitle(index: number, portfolio: Portfolio): string {
    return portfolio.title;
  }

  openAddDialog(): void {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      const currentUser = JSON.parse(savedUser);
      const dialogRef = this.dialog.open(AddPortfolioItemDialogComponent, {
        width: '500px',
        data: { profileId: currentUser.id }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.profileService.addPortfolioItem(currentUser.id, result).subscribe({
            next: () => {
              this.portfolios.unshift(result);
            },
            error: (err) => {
              console.error('Error adding to the portfolio:', err);
            }
          });
        }
      });
    } else {
      console.error('User not found in localStorage');
    }
  }
}
