import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Certifique-se de que o caminho está correto

export const authGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService); // AuthService pode ser injetado se você tiver lógica de verificação mais complexa lá
  const router = inject(Router);

  // Verifica se o token existe no localStorage
  const authToken = localStorage.getItem('auth_token');

  if (authToken) {
    // Se o token existe, permite o acesso à rota
    return true;
  } else {
    // Se o token NÃO existe, redireciona para a página de login
    console.warn('Tentativa de acesso a rota protegida sem token. Redirecionando para login.');
    router.navigate(['/login']); // Redireciona para sua rota de login
    return false; // Bloqueia o acesso à rota
  }
};
