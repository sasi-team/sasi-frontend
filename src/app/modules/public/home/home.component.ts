
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="container mx-auto p-4">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Bem-vindo ao SASI</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p class="mt-4">Sistema de Análise de Saúde Integrado - Uma iniciativa do CEPEDI, RESTIC36 e SOFTEX</p>
          <div class="mt-4">
            <h3 class="text-lg font-bold">Sobre o Projeto</h3>
            <p>Plataforma integrada para análise e visualização de dados de saúde do estado da Bahia.</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class HomeComponent {}