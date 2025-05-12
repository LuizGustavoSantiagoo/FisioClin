import { Routes } from '@angular/router';
import { LoginPageComponent } from './app/components/login-page/login-page.component';
import { AdminHomeComponent } from './app/components/admin-home/admin-home.component';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'admin-home', component: AdminHomeComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }

];
