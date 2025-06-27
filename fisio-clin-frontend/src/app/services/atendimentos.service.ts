import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../features/auth/services/auth.service';
import { environment } from '../../environments/environments';
import { Atendimento, AtendimentoResponse } from '../interfaces/atendimento.interface';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AtendimentosService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  cadastrarAtendimento(atendimento: Atendimento): Observable<AtendimentoResponse> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.post<AtendimentoResponse>(`${this.apiUrl}/atendimentos`, atendimento, { headers }).pipe(
      catchError(httpError => {
        console.error('Erro na requisição HTTP ao cadastrar atendimento:', httpError);
        let userMessage = 'Erro desconhecido ao cadastrar atendimento.';

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

  getAtendimentosById(id: string): Observable<Atendimento[]> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.get<Atendimento[]>(`${this.apiUrl}/atendimentos/${id}`, {headers}).pipe(
      catchError(
        HttpError => {
          console.log("Erro ao buscar atendimentos", HttpError);
          const userMessage = "Erro desconhecido ao buscar atendimentos";
          return throwError(() => new Error(userMessage));
        }
      )
    );
  }

  delAtendimentos(id: string) {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.delete<Atendimento[]>(`${this.apiUrl}/atendimentos/${id}`,  {headers}).pipe(
      catchError(
        HttpError => {
          console.log("Erro ao buscar atendimentos", HttpError);
          const userMessage = "Erro desconhecido ao buscar atendimentos";
          return throwError(() => new Error(userMessage));
        }
      )
    );
  }
}


