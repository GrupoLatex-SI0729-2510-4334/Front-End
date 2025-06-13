import { Component } from '@angular/core';
import {AgendaFunctionComponent} from '../../components/agenda-function/agenda-function.component';

@Component({
  selector: 'app-agenda-page',
  imports: [
    AgendaFunctionComponent,
  ],
  templateUrl: './agenda-page.component.html',
  styleUrl: './agenda-page.component.css'
})
export class AgendaPageComponent {

}
