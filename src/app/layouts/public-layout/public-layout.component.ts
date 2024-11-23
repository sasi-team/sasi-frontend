import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <div class="min-h-screen flex flex-col">
      <mat-toolbar color="primary" class="bg-gray-800 text-white">
        <span class="text-white">SASI - Sistema de Análise de Saúde Integrado</span>
        <span class="flex-1"></span>
        <nav>
          <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="text-white">
            Início
          </a>
          <a mat-button routerLink="/login" routerLinkActive="active" class="text-white">
            Login
          </a>
        </nav>
      </mat-toolbar>

      <div class="flex-1 p-4">
        <router-outlet></router-outlet>
      </div>

      <footer class="bg-gray-200 p-4 text-center">
        <p>© 2024 SASI - Desenvolvido por CEPEDI | RESTIC36 | SOFTEX</p>
      </footer>
    </div>
  `,
  styles: [`
    .active {
      background: rgba(255, 255, 255, 0.1);
    }
    nav {
      display: flex;
      gap: 1rem;
    }
    .bg-gray-800 {
      background-color: #2d3748 !important;
    }
    .text-white {
      color: #ffffff !important;
    }
    mat-toolbar {
      font-family: 'Roboto', sans-serif;
      font-size: 1.25rem;
    }
    nav a {
      font-family: 'Roboto', sans-serif;
      font-size: 1rem;
    }
  `]
})
export class PublicLayoutComponent {}