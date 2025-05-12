import { Routes } from '@angular/router';
import { HomePageComponent } from './dashboard/pages/home-page/home-page.component';
import {SearchPageComponent} from './search/pages/search-page/search-page.component';
import {ProfilePageComponent} from './profile/pages/profile-page/profile-page.component';
import {PostulationsPageComponent} from './postulations/pages/postulations-page/postulations-page.component';
import {EvaluationsPageComponent} from './evaluations/pages/evaluations-page/evaluations-page.component';
import {AgendaPageComponent} from './agenda/pages/agenta-page/agenda-page.component';

export const routes: Routes = [
  { path: 'dashboard', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'postulations', component: PostulationsPageComponent },
  { path: 'evaluations', component: EvaluationsPageComponent },
  { path: 'agenda', component: AgendaPageComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
