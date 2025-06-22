import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
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
    // Obtenha o token de autenticação do AuthService
    const authToken = this.authService.getToken();

    // Crie os cabeçalhos da requisição, incluindo o token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}` // Adicione o token de autenticação
    });

    return this.http.post<CadastroResponse>(`${this.apiUrl}/cadastroPaciente`, paciente, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao cadastrar paciente:', error);
        // Re-lança o erro para o componente lidar com ele
        return throwError(() => new Error(error.error?.message || 'Erro desconhecido ao cadastrar paciente.'));
      })
    );
  }

  getPacientes(): Observable<Paciente[]> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get<Paciente[]>(`${this.apiUrl}/pacientes`, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao buscar pacientes:', error);
        return throwError(() => new Error(error.error?.message || 'Erro desconhecido ao buscar pacientes.'));
      })
    );
  }
}