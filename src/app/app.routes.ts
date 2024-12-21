import { Routes } from '@angular/router';
import { ComicListComponent } from './components/comic-list/comic-list.component';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: '/comics', pathMatch: 'full' },
  { path: 'comics', component: ComicListComponent },
  { path: 'auth', component: AuthComponent }
];