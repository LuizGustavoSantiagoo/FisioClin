import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import '@clr/icons';
import '@clr/icons/shapes/all-shapes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // 👈 Aqui está o HttpClient agora incluído
    importProvidersFrom(
      BrowserAnimationsModule,
      ClarityModule,
      FormsModule
    )
  ]
});
