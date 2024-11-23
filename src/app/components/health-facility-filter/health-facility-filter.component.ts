import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EstabelecimentosDeSaude } from '../../models/health-facility.model';

@Component({
  selector: 'app-health-facility-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  template: `
    <div class="controls">
      <mat-form-field>
        <input matInput [(ngModel)]="filters.codigo_municipio" placeholder="Código do Município">
      </mat-form-field>
      <mat-form-field>
        <input matInput [(ngModel)]="filters.codigo_tipo_unidade" placeholder="Código do Tipo de Unidade">
      </mat-form-field>
      <mat-form-field>
        <input matInput [(ngModel)]="filters.codigo_uf" placeholder="Código da UF">
      </mat-form-field>
      <mat-form-field>
        <input matInput [(ngModel)]="filters.status" placeholder="Status">
      </mat-form-field>
      <mat-form-field>
        <input matInput [(ngModel)]="filters.estabelecimento_possui_centro_cirurgico" placeholder="Possui Centro Cirúrgico">
      </mat-form-field>
      <mat-form-field>
        <input matInput [(ngModel)]="filters.estabelecimento_possui_centro_obstetrico" placeholder="Possui Centro Obstétrico">
      </mat-form-field>
      <button mat-raised-button color="primary" (click)="onFilter()">Buscar</button>
    </div>
  `,
  styles: [`
    .controls {
      margin: 20px;
    }
  `]
})
export class HealthFacilityFilterComponent {
  filters: EstabelecimentosDeSaude = {
    codigo_municipio: undefined,
    codigo_tipo_unidade: undefined,
    codigo_uf: undefined,
    status: undefined,
    estabelecimento_possui_centro_cirurgico: undefined,
    estabelecimento_possui_centro_obstetrico: undefined,
    limit: 100,
    offset: 0
  };

  @Output() filter = new EventEmitter<EstabelecimentosDeSaude>();

  onFilter() {
    this.filter.emit(this.filters);
  }
}