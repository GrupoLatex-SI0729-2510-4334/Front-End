import { Component } from '@angular/core';
import {DashboardFunctionComponent} from '../../components/dashboard-function/dashboard-function.component';

@Component({
  selector: 'app-home-page',
  imports: [
    DashboardFunctionComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
