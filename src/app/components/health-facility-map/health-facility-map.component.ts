import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import { EstabelecimentoResponse, EstabelecimentosDeSaude } from '../../models/health-facility.model';
import { EstabelecimentosSaudeService } from '../../services/health-facilities.service';

@Component({
  selector: 'app-health-facility-map',
  standalone: true,
  template: `
    <div id="map" style="height: 500px;"></div>
  `,
  styles: [`
    #map {
      height: 500px;
    }
  `]
})
export class HealthFacilityMapComponent implements OnInit, OnChanges {
  @Input() filters!: EstabelecimentosDeSaude;
  private map!: L.Map;
  private healthFacilitiesLayer?: L.LayerGroup;

  constructor(private _service: EstabelecimentosSaudeService) {}

  ngOnInit() {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filters'] && changes['filters'].currentValue) {
      this.loadHealthFacilities();
    }
  }

  private initializeMap() {
    this.map = L.map('map').setView([-14.8639, -40.8243], 5);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private loadHealthFacilities() {
    const params: EstabelecimentosDeSaude = {
      ...this.filters,
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

  private fetchAndPlotHealthFacilities(params: EstabelecimentosDeSaude) {
    this._service.getEstabelecimentos(params).subscribe((response: EstabelecimentoResponse) => {
      const newEstabelecimentos = response.estabelecimentos;

      this.updateHeatmap(newEstabelecimentos);

      if (newEstabelecimentos.length === params.limit) {
        params.offset = (params.offset || 0) + params.limit;
        this.fetchAndPlotHealthFacilities(params);
      } else {
        console.log('All estabelecimentos loaded');
      }
    });
  }

  private updateHeatmap(estabelecimentos: any[]) {
    if (!this.healthFacilitiesLayer) {
      this.healthFacilitiesLayer = L.layerGroup().addTo(this.map);
    }

    const heatData = estabelecimentos
      .filter(estabelecimento => estabelecimento.latitude_estabelecimento_decimo_grau && estabelecimento.longitude_estabelecimento_decimo_grau)
      .map(estabelecimento => [
        estabelecimento.latitude_estabelecimento_decimo_grau,
        estabelecimento.longitude_estabelecimento_decimo_grau,
        2 // Intensidade do ponto
      ]);

    const heat = (L as any).heatLayer(heatData, { radius: 25 }).addTo(this.map);

    if (this.healthFacilitiesLayer) {
      this.healthFacilitiesLayer.addLayer(heat);
    }
  }
}