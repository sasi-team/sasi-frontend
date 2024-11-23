
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="flex items-center justify-center min-h-[80vh]">
      <mat-card class="w-full max-w-md p-6">
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form #loginForm="ngForm" (ngSubmit)="onLogin()" class="flex flex-col gap-4">
            <mat-form-field>
              <input matInput placeholder="Usuário" name="username" [(ngModel)]="username" required>
            </mat-form-field>
            <mat-form-field>
              <input matInput type="password" placeholder="Senha" name="password" [(ngModel)]="password" required>
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit">Entrar</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/app']);
    }
  }
}