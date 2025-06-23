import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { Paciente, CadastroResponse } from '../interfaces/paciente.interface';
import { AuthService } from '../features/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  /**
   * Cadastra um novo paciente no backend.
   * Adiciona o token de autenticação no cabeçalho da requisição.
   * @param paciente Os dados do paciente a serem cadastrados.
   * @returns Observable da resposta de cadastro.
   */
  cadastrarPaciente(paciente: Paciente): Observable<CadastroResponse> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.post<CadastroResponse>(`${this.apiUrl}/pacientes`, paciente, { headers }).pipe(
      catchError(httpError => {
        console.error('Erro na requisição HTTP ao cadastrar paciente:', httpError);
        let userMessage = 'Erro desconhecido ao cadastrar paciente.';

        // Tentativa de extrair uma mensagem mais amigável do HttpErrorResponse
        if (httpError.error && httpError.error.message) {
          userMessage = httpError.error.message;
        } else if (typeof httpError.error === 'string') { // Para erros que são apenas uma string
          userMessage = httpError.error;
        } else if (httpError.message) {
          userMessage = httpError.message;
        }

        // >>>>>>>>>>>>> CORREÇÃO AQUI <<<<<<<<<<<<<<<
        // Passa a instância do erro diretamente para throwError (RxJS 7+)
        return throwError(() => new Error(userMessage));
      })
    );
  }

  getPacientes(p0: string, p1: string): Observable<Paciente[]> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    let params = new HttpParams();
    if (p0) {
      params = params.append('name', p0);
    }
    if (p1) {
      params = params.append('cpf', p1);
    }
    return this.http.get<Paciente[]>(`${this.apiUrl}/pacientes`, { headers, params }).pipe(
      catchError(httpError => {
        console.error('Erro na requisição HTTP ao buscar pacientes:', httpError);
        let userMessage = 'Ocorreu um erro desconhecido ao buscar pacientes.';

        if (httpError.error && httpError.error.message) {
          userMessage = httpError.error.message;
        } else if (typeof httpError.error === 'string') {
          userMessage = httpError.error;
        } else if (httpError.message) {
          userMessage = httpError.message;
        }
        return throwError(() => new Error(userMessage));
      })

    );
  }
}