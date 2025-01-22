import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;

  login(username: string, password: string): boolean {
    // Mock de autenticacao
    //TODO: Implementar autenticação com jwt
    if (username && password) {
      this.authenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.authenticated = false;
    localStorage.removeItem('isAuthenticated');
  }

  isAuthenticated(): boolean {
    return this.authenticated || localStorage.getItem('isAuthenticated') === 'true';
  }
}