import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-postulations-function',
  templateUrl: './postulations-function.component.html',
  styleUrls: ['./postulations-function.component.css'],
  imports: [
    FormsModule,


    RouterLink,


    MatCard,
    MatCardTitle,
    MatCardContent
  ]
})
export class PostulationsFunctionComponent  {

}



