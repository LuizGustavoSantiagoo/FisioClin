import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AtendimentosComponent } from './pages/atendimentos/atendimentos.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './features/auth/guards/auth.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'atendimentos',
    component: AtendimentosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
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
