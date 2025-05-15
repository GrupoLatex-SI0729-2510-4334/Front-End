import { Component } from '@angular/core';
import {AgendaFunctionComponent} from '../../components/agenda-function/agenda-function.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-agenda-page',
  imports: [
    AgendaFunctionComponent,
    RouterOutlet
  ],
  templateUrl: './agenda-page.component.html',
  styleUrl: './agenda-page.component.css'
})
export class AgendaPageComponent {

}
