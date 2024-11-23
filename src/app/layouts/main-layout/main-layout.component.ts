import { Component, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="side" [opened]="true" class="w-64">
        <mat-nav-list>
          <a mat-list-item routerLink="/app/dashboard">Dashboard</a>
          <a mat-list-item routerLink="/app/indicators">Indicadores de Saúde</a>
          <a mat-list-item routerLink="/app/analytics">Análise de Dados</a>
          <a mat-list-item routerLink="/app/dados-abertos-saude">Estabelecimentos de Saúde</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar>
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>SASI - Sistema de Análise de Saúde Integrado</span>
        </mat-toolbar>
        <div class="p-4">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    mat-sidenav-container {
      height: 100vh;
    }
  `]
})
export class MainLayoutComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
}