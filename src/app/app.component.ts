import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContent, MatSidenavContainer} from '@angular/material/sidenav';
import {SidebarComponent} from './public/components/navbar/sidebar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatSlider} from '@angular/material/slider';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatLabel} from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    SidebarComponent,
    MatIconModule,
    MatCardTitle,
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatFormField,
    MatSlider,
    MatFormField,
    MatFormField,
    MatCheckbox,
    MatInput,
    MatCardActions,
    MatButton,
    MatSliderModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
}
