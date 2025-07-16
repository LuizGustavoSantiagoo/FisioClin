import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { Users } from '../interfaces/users.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { cadastroResponseUser } from '../interfaces/users.interface';
import { AuthService } from '../features/auth/services/auth.service';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl;
  private selectedUserSubject = new BehaviorSubject<Users | null>(null);
  selectedUser$: Observable<Users | null> = this.selectedUserSubject.asObservable();


  constructor(private http: HttpClient, private authService: AuthService) { }

  setSelectedUser(user: Users): void {
    this.selectedUserSubject.next(user);
  }

  getSelectedUser(): Users | null {
    return this.selectedUserSubject.getValue();
  }

  clearSelectedUser(): void {
    this.selectedUserSubject.next(null);
  }

  public createUser(user: Users): Observable<cadastroResponseUser> {

    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.patch<cadastroResponseUser>(`${this.apiUrl}/user`, user, { headers }).pipe(
      catchError(_httpError => {
        console.log(_httpError);
        throw _httpError;
      })
    )

  }

  public getUsers(): Observable<{ fisios: Users[] }> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.get<{ fisios: Users[] }>(`${this.apiUrl}/users/`, { headers }).pipe(
      catchError(_httpError => {
        console.log(_httpError);
        throw _httpError;
      })
    );
  }
}
