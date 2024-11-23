import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import { EstabelecimentoResponse, EstabelecimentosDeSaude } from '../../models/health-facility.model';
import { EstabelecimentosSaudeService } from '../../services/health-facilities.service';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-health-facility-map',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div [id]="mapId" style="height: 400px;"></div>
    <button *ngIf="areFiltersFilled()" (click)="toggleMarkers()">Toggle Markers</button>
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
  @Input() displayMarkers: boolean = false;
  @Input() toggleMarkersEvent!: Observable<boolean>;
  private map!: L.Map;
  private healthFacilitiesLayer!: L.LayerGroup;
  private markersLayer!: L.LayerGroup;
  private toggleMarkersSubscription!: Subscription;
  mapId = 'map-' + Math.random().toString(36).substr(2, 9);

  constructor(private _service: EstabelecimentosSaudeService) {}

  ngOnInit() {
    if (this.toggleMarkersEvent) {
      this.toggleMarkersSubscription = this.toggleMarkersEvent.subscribe(showMarkers => {
        this.displayMarkers = showMarkers;
        this.loadHealthFacilities();
      });
    }
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
    if (this.toggleMarkersSubscription) {
      this.toggleMarkersSubscription.unsubscribe();
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
    this.markersLayer = L.layerGroup().addTo(this.map);
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

      if (this.displayMarkers) {
        this.addMarkers(newEstabelecimentos);
      } else {
        this.updateHeatmap(newEstabelecimentos);
      }

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

  private addMarkers(estabelecimentos: any[]) {
    if (!this.map) return;

    if (this.markersLayer) {
      this.markersLayer.clearLayers();
    }

    estabelecimentos.forEach(estabelecimento => {
      if (estabelecimento.latitude_estabelecimento_decimo_grau && estabelecimento.longitude_estabelecimento_decimo_grau) {
        const marker = L.marker([estabelecimento.latitude_estabelecimento_decimo_grau, estabelecimento.longitude_estabelecimento_decimo_grau], {
        }).bindPopup(`<b>${estabelecimento.nome_fantasia}</b><br>${estabelecimento.endereco_estabelecimento}`);
        this.markersLayer.addLayer(marker);
      }
    });
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

  areFiltersFilled(): boolean {
    return this.filters.codigo_tipo_unidade != null && this.filters.codigo_uf != null;
  }

  toggleMarkers() {
    this.displayMarkers = !this.displayMarkers;
    this.loadHealthFacilities();
  }
}