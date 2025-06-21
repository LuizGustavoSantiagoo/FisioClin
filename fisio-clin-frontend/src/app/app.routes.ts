import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './features/auth/guards/auth.guard'; 
export const routes: Routes = [
  {
    path: '', // Rota raiz
    redirectTo: '/home', // Redireciona a raiz para /home
    pathMatch: 'full'
  },
  {
    path: 'login', // Rota de login NÃO é protegida
    component: LoginPageComponent
  },
  {
    path: '', 
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home', 
        component: HomeComponent
      },

    ]
  },
  {
    path: '**',
    redirectTo: '/home' 
  }
];
