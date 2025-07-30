import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryDetailComponent } from './pages/country/country-detail.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':name/:id',
    component: CountryDetailComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
