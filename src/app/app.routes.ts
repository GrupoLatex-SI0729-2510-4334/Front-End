import { Routes } from '@angular/router';
import { HomePageComponent } from './dashboard/pages/home-page/home-page.component';
import {SearchPageComponent} from './search/pages/search-page/search-page.component';
import {ProfilePageComponent} from './profile/pages/profile-page/profile-page.component';
import {PostulationsPageComponent} from './postulations/pages/postulations-page/postulations-page.component';
import {EvaluationsPageComponent} from './evaluations/pages/evaluations-page/evaluations-page.component';
import {AgendaPageComponent} from './agenda/pages/agenta-page/agenda-page.component';
import {
  EvaluationsFunctionComponent
} from './evaluations/components/evaluations-function/evaluations-function.component';
import { EvaluatedEventsPageComponent } from './evaluations/pages/evaluated-events-page/evaluated-events-page.component';
import {
  PostulationsDetailsComponent
} from './postulations/components/postulations-details/postulations-details.component';
import {LoginPageComponent} from './login/pages/login-page/login-page.component';
import {BlankPageComponent} from './login/pages/blank-page/blank-page.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'dashboard', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'blank', component: BlankPageComponent },
  { path: 'postulations', component: PostulationsPageComponent },
  { path: 'evaluations', component: EvaluationsPageComponent },
  { path: 'evaluations/:evaluationId', component: EvaluationsFunctionComponent },
  { path: 'evaluated-events', component: EvaluatedEventsPageComponent },
  { path: 'agenda', component: AgendaPageComponent },
  { path: 'postulations-details', component: PostulationsDetailsComponent },
  {path: 'saved-postulations', component: SavedPostulationsComponent}
];
