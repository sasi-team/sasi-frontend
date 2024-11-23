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
      <mat-sidenav #sidenav mode="over" [opened]="false" class="w-56 bg-gray-800 text-white">
        <mat-nav-list>
          <a mat-list-item routerLink="/app/dashboard" routerLinkActive="active-link" class="text-white">
            <span class="mdc-list-item__content">
              <span class="mat-mdc-list-item-unscoped-content mdc-list-item__primary-text text-white">Dashboard</span>
            </span>
          </a>
          <a mat-list-item routerLink="/app/indicators" routerLinkActive="active-link" class="text-white">
            <span class="mdc-list-item__content">
              <span class="mat-mdc-list-item-unscoped-content mdc-list-item__primary-text text-white">Indicadores de Saúde</span>
            </span>
          </a>
          <!-- <a mat-list-item routerLink="/app/map" routerLinkActive="active-link" class="text-white">
            <span class="mdc-list-item__content">
              <span class="mat-mdc-list-item-unscoped-content mdc-list-item__primary-text text-white">Mapa de Calor</span>
            </span>
          </a>
          <a mat-list-item routerLink="/app/analytics" routerLinkActive="active-link" class="text-white">
            <span class="mdc-list-item__content">
              <span class="mat-mdc-list-item-unscoped-content mdc-list-item__primary-text text-white">Análise de Dados</span>
            </span>
          </a> -->
          <a mat-list-item routerLink="/app/dados-abertos-saude" routerLinkActive="active-link" class="text-white">
            <span class="mdc-list-item__content">
              <span class="mat-mdc-list-item-unscoped-content mdc-list-item__primary-text text-white">Estabelecimentos de Saúde</span>
            </span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary" class="bg-gray-800 text-white">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon class="text-white">menu</mat-icon>
          </button>
          <span class="text-white">SASI - Sistema de Análise de Saúde Integrado</span>
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
    .active-link {
      background: rgba(255, 255, 255, 0.1);
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
    mat-nav-list a {
      font-family: 'Roboto', sans-serif;
      font-size: 1rem;
    }
  `]
})
export class MainLayoutComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
}