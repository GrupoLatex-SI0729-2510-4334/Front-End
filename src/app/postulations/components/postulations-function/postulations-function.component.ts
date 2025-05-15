import { Component, OnInit } from '@angular/core';
import {Postulation} from '../../model/postulation.entity';
import {PostulationService} from '../../services/postulation.service';
import {SearchService} from '../../../search/services/search.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-postulations-function',
  templateUrl: './postulations-function.component.html',
  styleUrls: ['./postulations-function.component.css'],
  imports: [
    FormsModule,



    RouterLink,


    MatCard
  ]
})
export class PostulationsFunctionComponent  {

}

