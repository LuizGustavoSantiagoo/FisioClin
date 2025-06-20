// src/app/features/auth/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   *
   * @param credentials
   * @returns
   */
  login(credentials: { email: string, senha: string }): Observable<any> {
    // O endpoint de login no Laravel geralmente é /api/login
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
