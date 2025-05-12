import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {Event} from '../../model/dashboard.entity';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatAnchor} from '@angular/material/button';
import {DatePipe, NgForOf} from '@angular/common';
import {MatCardTitle} from '@angular/material/card';
import {MatCardSubtitle} from '@angular/material/card';

@Component({
  selector: 'app-dashboard-function',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatAnchor,
    DatePipe,
    MatCardTitle,
    MatCardSubtitle,
    NgForOf
  ],
  templateUrl: './dashboard-function.component.html',
  styleUrl: './dashboard-function.component.css'
})

export class DashboardFunctionComponent implements OnInit {
  events: Event[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }
}
