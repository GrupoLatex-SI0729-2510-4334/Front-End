import { Component } from '@angular/core';
import {ProfileFunctionComponent} from '../../components/profile-function/profile-function.component';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileFunctionComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

}
