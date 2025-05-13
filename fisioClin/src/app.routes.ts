import { Routes } from '@angular/router';
import { LoginPageComponent } from './app/components/login-page/login-page.component';
import { AdminHomeComponent } from './app/components/admin-home/admin-home.component';
import { HomePageComponent } from './app/components/home-page/home-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'admin-home', component: AdminHomeComponent },
    { path: 'home', component: HomePageComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }

];
