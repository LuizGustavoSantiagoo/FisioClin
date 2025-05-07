import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';

platformBrowserDynamic().bootstrapModule(AppComponent)  // Bootstrapping AppComponent diretamente
  .catch(err => console.error(err));


export const appConfig = {
  providers: [
    provideHttpClient() // Add necessary providers here
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
