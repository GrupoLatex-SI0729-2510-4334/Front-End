import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Portfolio } from '../../model/portfolio.entity';

@Component({
  selector: 'app-portfolio-item',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './portfolio-item.component.html',
  styleUrl: './portfolio-item.component.css'
})
export class PortfolioItemComponent {
  @Input() portfolio!: Portfolio;
}
