import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { environment } from './environments/environment';
import { appRoutes } from './app/app.routes'; // Ce fichier sera à créer dans l'étape suivante

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes), provideHttpClient(), provideAnimations()],
}).catch(err => console.error(err));
