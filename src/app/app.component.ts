import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContent, MatSidenavContainer} from '@angular/material/sidenav';
import {SidebarComponent} from './public/components/navbar/sidebar.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    SidebarComponent,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
}
