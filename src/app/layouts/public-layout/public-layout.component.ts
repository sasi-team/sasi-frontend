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
      <mat-toolbar color="primary">
        <span>SASI - Sistema de Análise de Saúde Integrado</span>
        <span class="flex-1"></span>
        <nav>
          <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            Início
          </a>
          <a mat-button routerLink="/login" routerLinkActive="active">
            Login
          </a>
        </nav>
      </mat-toolbar>

      <div class="flex-1 p-4">
        <router-outlet></router-outlet>
      </div>

      <footer class="bg-gray-100 p-4 text-center">
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
  `]
})
export class PublicLayoutComponent {}