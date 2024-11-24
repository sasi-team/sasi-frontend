import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
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
    <button *ngIf="areFiltersFilled()" (click)="toggleMarkers()">
      {{ displayMarkers ? 'Show Clusters' : 'Show Markers' }}
    </button>
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
  private markerClusterGroup!: L.MarkerClusterGroup;
  private markersLayer!: L.LayerGroup;
  private toggleMarkersSubscription!: Subscription;
  mapId = 'map-' + Math.random().toString(36).substr(2, 9);
  private allMarkers: L.Marker[] = [];

  constructor(private _service: EstabelecimentosSaudeService) {}

  ngOnInit() {
    if (this.toggleMarkersEvent) {
      this.toggleMarkersSubscription = this.toggleMarkersEvent.subscribe(showMarkers => {
        this.displayMarkers = showMarkers;
        this.updateMarkersDisplay();
      });
    }
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filters'] && changes['filters'].currentValue) {
      if (this.markerClusterGroup && this.markersLayer) {
        this.loadHealthFacilities();
      }
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

    // Initialize cluster group with custom options
    this.markerClusterGroup = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true
    });

    this.markersLayer = L.layerGroup();
    this.map.addLayer(this.markerClusterGroup);
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

    if (this.markerClusterGroup && this.markersLayer) {
      this.clearMarkers();
    }
    this.fetchAndPlotHealthFacilities(filteredParams);
  }

  private fetchAndPlotHealthFacilities(params: EstabelecimentosDeSaude) {
    this._service.getEstabelecimentos(params).subscribe((response: EstabelecimentoResponse) => {
      const newEstabelecimentos = response.estabelecimentos;
      this.addMarkersToMap(newEstabelecimentos);

      if (newEstabelecimentos.length === params.limit) {
        params.offset = (params.offset || 0) + params.limit;
        this.fetchAndPlotHealthFacilities(params);
      }
    });
  }

  private addMarkersToMap(estabelecimentos: any[]) {
    estabelecimentos.forEach(estabelecimento => {
      if (estabelecimento.latitude_estabelecimento_decimo_grau && 
          estabelecimento.longitude_estabelecimento_decimo_grau) {
        
        const marker = L.marker(
          [estabelecimento.latitude_estabelecimento_decimo_grau, 
           estabelecimento.longitude_estabelecimento_decimo_grau]
        );

        let popupContent = `<b>${estabelecimento.nome_fantasia}</b><br>`;

        if (estabelecimento.tipo_unidade) {
          popupContent += `Tipo: ${estabelecimento.tipo_unidade} <br>`;
        }
        if (estabelecimento.numero_telefone_estabelecimento) {
          popupContent += `Telefone: ${estabelecimento.numero_telefone_estabelecimento} <br>`;
        }
        if (estabelecimento.razao_social) {
          popupContent += `Razão Social: ${estabelecimento.razao_social} <br>`;
        }
        if (estabelecimento.endereco_estabelecimento) {
          popupContent += `${estabelecimento.endereco_estabelecimento}`;
        }

        marker.bindPopup(popupContent);

        this.allMarkers.push(marker);
        
        if (this.displayMarkers) {
          this.markersLayer.addLayer(marker);
        } else {
          this.markerClusterGroup.addLayer(marker);
        }
      }
    });

    this.updateMarkersDisplay();
  }

  private clearMarkers() {
    this.markerClusterGroup.clearLayers();
    this.markersLayer.clearLayers();
    this.allMarkers = [];
  }

  private updateMarkersDisplay() {
    this.markerClusterGroup.clearLayers();
    this.markersLayer.clearLayers();
    
    if (this.displayMarkers) {
      this.map.removeLayer(this.markerClusterGroup);
      this.allMarkers.forEach(marker => this.markersLayer.addLayer(marker));
      this.map.addLayer(this.markersLayer);
    } else {
      this.map.removeLayer(this.markersLayer);
      this.allMarkers.forEach(marker => this.markerClusterGroup.addLayer(marker));
      this.map.addLayer(this.markerClusterGroup);
    }
  }

  private zoomToCity(coordinates: { latitude: number, longitude: number }) {
    if (this.map) {
      const zoom = coordinates.latitude === -14.8639 && 
                  coordinates.longitude === -40.8243 ? 5 : 12;
      this.map.setView([coordinates.latitude, coordinates.longitude], zoom);
    }
  }

  areFiltersFilled(): boolean {
    return this.filters.codigo_tipo_unidade != null && this.filters.codigo_uf != null;
  }

  toggleMarkers() {
    this.displayMarkers = !this.displayMarkers;
    this.updateMarkersDisplay();
  }
}