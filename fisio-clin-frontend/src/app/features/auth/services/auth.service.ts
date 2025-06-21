import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs'; // Importe BehaviorSubject, tap, catchError, throwError
import { environment } from '../../../../environments/environments';
import { User, LoginResponse } from '../../../interfaces/user.interface'; // Importe suas interfaces

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl; // Base URL da sua API Laravel

  // --- Adicionado para Gerenciamento de Estado ---
  private readonly AUTH_TOKEN_KEY = 'authToken';
  private readonly USER_DATA_KEY = 'userData';

  // BehaviorSubject para o usuário logado, inicializado com null
  private _currentUser = new BehaviorSubject<User | null>(null);
  // Observable público para que componentes possam se inscrever
  currentUser$: Observable<User | null> = this._currentUser.asObservable();
  // --- Fim da Adição ---

  constructor(private http: HttpClient) {
    // Carrega o usuário do localStorage ao iniciar o serviço
    this.loadUserFromLocalStorage();
  }

  /**
   * Realiza a requisição de login ao backend Laravel.
   * Ao receber uma resposta 200 OK, salva o token e os dados do usuário.
   * @param credentials Objeto com email e senha do usuário.
   * @returns Observable da resposta do login.
   */
  login(credentials: { email: string, senha: string }): Observable<LoginResponse> {
    // O endpoint de login no Laravel geralmente é /api/login
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Se a requisição foi bem-sucedida (status 200 OK), a resposta é processada aqui
        if (response.token && response.user) {
          this.setSession(response.token, response.user);
        } else {
          // Tratar caso a resposta não contenha token ou user (ex: erro no backend)
          console.error('Resposta de login inválida: token ou user ausente.', response);
          // Opcional: throw um erro para que o componente possa tratar
          throw new Error('Credenciais inválidas ou erro no servidor.');
        }
      }),
      catchError(error => {
        // Manipulação de erros da requisição HTTP (ex: 401 Unauthorized, 500 Internal Server Error)
        console.error('Erro na requisição de login:', error);
        this.logout(); // Garante que o estado seja limpo em caso de erro
        return throwError(() => new Error(error.error?.message || 'Erro de autenticação desconhecido.'));
      })
    );
  }

  /**
   * Salva o token e os dados do usuário no localStorage e atualiza o BehaviorSubject.
   * @param token O token de autenticação recebido do backend.
   * @param user Os dados do usuário logado.
   */
  private setSession(token: string, user: User): void {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(user));
    this._currentUser.next(user); // Atualiza o BehaviorSubject para notificar os observadores
  }

  /**
   * Tenta carregar os dados do usuário do localStorage ao iniciar o serviço.
   */
  private loadUserFromLocalStorage(): void {
    const userDataString = localStorage.getItem(this.USER_DATA_KEY);
    if (userDataString) {
      try {
        const user: User = JSON.parse(userDataString);
        this._currentUser.next(user);
      } catch (e) {
        console.error("Erro ao carregar ou fazer parse dos dados do usuário do localStorage:", e);
        this.logout(); // Limpa dados inválidos para evitar problemas futuros
      }
    }
  }

  /**
   * Realiza o logout: remove dados do localStorage e limpa o estado do serviço.
   */
  logout(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem(this.USER_DATA_KEY);
    this._currentUser.next(null); // Define o usuário como null
  }

  /**
   * Retorna o token de autenticação.
   * @returns O token ou null.
   */
  getToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  /**
   * Retorna o objeto do usuário logado.
   * @returns O objeto User ou null.
   */
  getCurrentUser(): User | null {
    return this._currentUser.getValue();
  }

  /**
   * Verifica se o usuário está logado.
   * @returns true se logado, false caso contrário.
   */
  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }

  /**
   * Verifica se o usuário logado é um ADMIN.
   * @returns true se for ADMIN, false caso contrário.
   */
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === 'ADMIN' : false;
  }

  /**
   * Verifica se o usuário logado é um FISIOTERAPEUTA.
   * @returns true se for FISIOTERAPEUTA, false caso contrário.
   */
  isFisioterapeuta(): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === 'FISIOTERAPEUTA' : false;
  }
}