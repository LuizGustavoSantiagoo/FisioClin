import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './features/auth/guards/auth.guard'; // Importe o seu Auth Guard

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
    path: '', // Esta é uma rota pai vazia que engloba as rotas protegidas
    canActivate: [authGuard], // <--- Aplica o Auth Guard a todas as rotas filhas
    children: [
      {
        path: 'home', // Agora /home é uma rota filha protegida
        component: HomeComponent
      },
      // Adicione aqui outras rotas que você queira proteger
      // Exemplo: { path: 'dashboard', component: DashboardComponent },
      // Exemplo: { path: 'profile', component: ProfileComponent },
    ]
  },
  {
    path: '**', // Rota curinga para qualquer URL não correspondida
    redirectTo: '/home' // Redireciona para /home, que será protegida pelo guard
  }
];
