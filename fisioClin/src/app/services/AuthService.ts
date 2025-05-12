import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth/login'; 
  constructor(private http: HttpClient) {}
  
  redirectTo(rota: string) {
    window.location.href = rota;
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials, { responseType: 'text' });
  }
}
