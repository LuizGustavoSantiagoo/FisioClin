import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private selectedUserSubject = new BehaviorSubject<User | null>(null);
  selectedUser$: Observable<User | null> = this.selectedUserSubject.asObservable();

  constructor() { }

  setSelectedUser(user: User): void {
    this.selectedUserSubject.next(user);
  }

  getSelectedUser(): User | null {
    return this.selectedUserSubject.getValue();
  }

  clearSelectedUser(): void {
    this.selectedUserSubject.next(null);
  }
}
