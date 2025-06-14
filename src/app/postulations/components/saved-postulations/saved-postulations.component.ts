import { Component, OnInit } from '@angular/core';
import { PostulationService } from '../../services/postulation.service';
import { Postulation } from '../../model/postulation.entity';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-saved-postulations',
  templateUrl: './saved-postulations.component.html',
  imports: [
    MatCardTitle,
    MatCardContent,
    MatCard,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./saved-postulations.component.css']
})
export class SavedPostulationsComponent implements OnInit {
  postulations: Postulation[] = [];

  constructor(private postulationService: PostulationService) {}

  ngOnInit(): void {
    this.postulationService.getPostulations().subscribe(data => {
      this.postulations = data;
    });
  }
}
