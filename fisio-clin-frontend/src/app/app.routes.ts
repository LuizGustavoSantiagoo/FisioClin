import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AtendimentosComponent } from './pages/atendimentos/atendimentos.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './features/auth/guards/auth.guard';
import { CadUsuarioComponent } from './pages/cad-usuario/cad-usuario.component';
import { AtendimentoPacienteComponent } from './pages/atendimento-paciente/atendimento-paciente.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { CadFisioterapeutasComponent } from './pages/cad-fisioterapeutas/cad-fisioterapeutas.component';
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
    path: 'cadastro_fisioterapeutas',
    component: CadFisioterapeutasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pacientes',
    component: CadUsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'atendimentoPaciente/:id',
    component: AtendimentoPacienteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'perfilPaciente/:id',
    component: PacienteComponent,
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
