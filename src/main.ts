// import { bootstrapApplication } from '@angular/platform-browser';
// import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
// import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

// import { routes } from './app/app.routes';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, {
//   providers: [
//     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
//     provideIonicAngular(),
//     provideRouter(routes, withPreloading(PreloadAllModules)),
//   ],
// });

import { bootstrapApplication } from '@angular/platform-browser';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';

addIcons(icons);

import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideHttpClient(),
    
    provideRouter(routes),
    
  ]
});
