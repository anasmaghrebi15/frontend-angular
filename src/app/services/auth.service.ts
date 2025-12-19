import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly MOCK_USERS: User[] = [
    {
      id: '1',
      email: 'anas.maghrebi@esprit.tn',
      dateCreation: new Date()
    },
    {
      id: '2',
      email: 'abderrahmen@terrakodo.com',
      dateCreation: new Date()
    }
  ];

  login(email: string): Observable<User> {
    const user = this.MOCK_USERS.find(u => u.email === email);
    
    if (user) {
      return of(user).pipe(delay(500));
    }
    
    return throwError(() => new Error('Utilisateur non trouvé'));
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}