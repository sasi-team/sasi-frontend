import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EstabelecimentosSaudeService, HealthFacilityParams } from '../../../services/health-facilities.service';
import 'leaflet.heat';

interface EstabelecimentoResponse {
  estabelecimentos: any[];
}

@Component({
  selector: 'app-dados-abertos-saude-map',
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
      <button mat-raised-button color="primary" (click)="onSubmit()">Buscar</button>
    </div>
    <div id="map" style="height: 500px;"></div>
  `,
  styles: [`
    .controls {
      margin: 20px;
    }
  `]
})
export class DadosAbertosSaudeMapComponent implements OnInit {
  private map!: L.Map;
  private healthFacilitiesLayer?: L.LayerGroup;
  filters: HealthFacilityParams = {
    codigo_municipio: undefined,
    codigo_tipo_unidade: undefined,
    codigo_uf: undefined,
    status: undefined,
    estabelecimento_possui_centro_cirurgico: undefined,
    estabelecimento_possui_centro_obstetrico: undefined,
    limit: 1000,
    offset: 0
  };

  constructor(private _service: EstabelecimentosSaudeService) {}

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap() {
    this.map = L.map('map').setView([-14.8639, -40.8243], 5);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  loadHealthFacilities() {
    const params: HealthFacilityParams = {
      codigo_municipio: this.filters.codigo_municipio,
      codigo_tipo_unidade: this.filters.codigo_tipo_unidade,
      codigo_uf: this.filters.codigo_uf,
      status: this.filters.status,
      estabelecimento_possui_centro_cirurgico: this.filters.estabelecimento_possui_centro_cirurgico,
      estabelecimento_possui_centro_obstetrico: this.filters.estabelecimento_possui_centro_obstetrico,
      limit: 100,
      offset: 0
    };

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v != null && v !== '')
    );

    if (!this.healthFacilitiesLayer) {
      this.healthFacilitiesLayer = L.layerGroup().addTo(this.map);
    } else {
      this.healthFacilitiesLayer.clearLayers();
    }

    this.fetchAndPlotHealthFacilities(filteredParams);
  }

  private fetchAndPlotHealthFacilities(params: HealthFacilityParams) {
    this._service.getEstabelecimentos(params).subscribe((response: EstabelecimentoResponse) => {
      const newFacilities = response.estabelecimentos;

      this.updateHeatmap(newFacilities);

      if (newFacilities.length === params.limit) {
        params.offset = (params.offset || 0) + params.limit;
        this.fetchAndPlotHealthFacilities(params);
      } else {
        console.log('All facilities loaded');
      }
    });
  }

  private updateHeatmap(estabelecimentos: any[]) {
    if (!this.healthFacilitiesLayer) {
      this.healthFacilitiesLayer = L.layerGroup().addTo(this.map);
    }

    const heatData = estabelecimentos
      .filter(facility => facility.latitude_estabelecimento_decimo_grau && facility.longitude_estabelecimento_decimo_grau)
      .map(facility => [
        facility.latitude_estabelecimento_decimo_grau,
        facility.longitude_estabelecimento_decimo_grau,
        3 // Intensidade do ponto
      ]);

    const heat = (L as any).heatLayer(heatData, { radius: 25 }).addTo(this.map);

    if (this.healthFacilitiesLayer) {
      this.healthFacilitiesLayer.addLayer(heat);
    }
  }

  onSubmit() {
    this.loadHealthFacilities();
  }
}