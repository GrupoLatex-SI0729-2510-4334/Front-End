import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCard} from '@angular/material/card';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-postulations-function',
  imports: [
    FormsModule,
    RouterLink,
    MatCard
  ],
  templateUrl: './postulations-function.component.html',
  styleUrls: ['./postulations-function.component.css'],
})
export class PostulationsFunctionComponent  {

}



