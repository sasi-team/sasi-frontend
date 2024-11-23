import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import { EstabelecimentoResponse, EstabelecimentosDeSaude } from '../../models/health-facility.model';
import { EstabelecimentosSaudeService } from '../../services/health-facilities.service';

@Component({
  selector: 'app-health-facility-map',
  standalone: true,
  template: `
    <div [id]="mapId" style="height: 400px;"></div>
  `,
  styles: [`
    #map {
      height: 500px;
    }
  `]
})
export class HealthFacilityMapComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() filters!: EstabelecimentosDeSaude;
  @Input() cityCoordinates!: { latitude: number, longitude: number };
  private map!: L.Map;
  private healthFacilitiesLayer!: L.LayerGroup;
  mapId = 'map-' + Math.random().toString(36).substr(2, 9);

  constructor(private _service: EstabelecimentosSaudeService) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filters'] && changes['filters'].currentValue) {
      this.loadHealthFacilities();
    }
    if (changes['cityCoordinates'] && changes['cityCoordinates'].currentValue) {
      this.zoomToCity(changes['cityCoordinates'].currentValue);
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private initializeMap() {
    if (this.map) {
      this.map.remove();
    }
    const mapContainer = document.getElementById(this.mapId);
    if (mapContainer) {
      (mapContainer as any)._leaflet_id = null;
    }
    this.map = L.map(this.mapId).setView([-14.8639, -40.8243], 5);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.healthFacilitiesLayer = L.layerGroup().addTo(this.map);
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

    if (this.healthFacilitiesLayer) {
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
        console.log('All establishments loaded');
      }
    });
  }

  private updateHeatmap(estabelecimentos: any[]) {
    if (!this.map) return;

    const zoomLevel = this.map.getZoom();
    const intensity = zoomLevel > 10 ? 1 : 5;

    const heatData = estabelecimentos
      .filter(estabelecimento => estabelecimento.latitude_estabelecimento_decimo_grau && estabelecimento.longitude_estabelecimento_decimo_grau)
      .map(estabelecimento => [
        estabelecimento.latitude_estabelecimento_decimo_grau,
        estabelecimento.longitude_estabelecimento_decimo_grau,
        intensity
      ]);

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });

    const heat = (L as any).heatLayer(heatData, { radius: 25, context }).addTo(this.map);

    if (this.healthFacilitiesLayer) {
      this.healthFacilitiesLayer.addLayer(heat);
    }
  }

  private zoomToCity(coordinates: { latitude: number, longitude: number }) {
    if (this.map) {
      if (coordinates.latitude === -14.8639 && coordinates.longitude === -40.8243) {
        this.map.setView([coordinates.latitude, coordinates.longitude], 5);
      } else {
        this.map.setView([coordinates.latitude, coordinates.longitude], 12);
      }
    }
  }
}