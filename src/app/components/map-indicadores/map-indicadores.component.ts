import { Component, Input, OnInit, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-indicadores',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="map" class="h-[500px]"></div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class MapIndicadoresComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() mapData: any = null;
  @Input() selectedData: { indicador: string, ano: string } | null = null;
  
  private map!: L.Map;
  private geojsonLayer?: L.GeoJSON;
  private isMapInitialized = false;

  ngOnInit() {}

  ngAfterViewInit() {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mapData']?.currentValue && this.isMapInitialized) {
      this.updateMap(changes['mapData'].currentValue);
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private initializeMap() {
    try {
      this.map = L.map('map').setView([-14.8639, -40.8243], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.isMapInitialized = true;

      if (this.mapData) {
        this.updateMap(this.mapData);
      }
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  private updateMap(data: any) {
    if (!this.map || !this.isMapInitialized) {
      console.warn('Map not initialized yet');
      return;
    }

    try {
      if (this.geojsonLayer) {
        this.map.removeLayer(this.geojsonLayer);
      }

      this.geojsonLayer = L.geoJSON(data, {
        style: (feature) => this.styleFunction(feature),
        onEachFeature: (feature, layer) => this.onEachFeature(feature, layer)
      });

      this.geojsonLayer.addTo(this.map);

      if (this.geojsonLayer.getBounds().isValid()) {
        this.map.fitBounds(this.geojsonLayer.getBounds());
      }
    } catch (error) {
      console.error('Error updating map:', error);
    }
  }

  private styleFunction(feature: any) {
    return {
      fillColor: feature.properties.fillColor,
      color: '#000000',
      weight: 0.1,
      fillOpacity: 0.7
    };
  }

  private onEachFeature(feature: any, layer: L.Layer) {
    if (feature.properties && feature.properties.name) {
      layer.bindTooltip(
        `<div>
          <strong>Município:</strong> ${feature.properties.name}<br>
          <strong>Valor do Indicador:</strong> ${(feature.properties.valor).toFixed(2)}%<br>
          <strong>Meta Estadual:</strong> ${feature.properties.meta_estadual_valor.toFixed(2)}${feature.properties.sufix_meta}
        </div>`,
        { sticky: true }
      );
    }
    layer.on({
      mouseover: (e) => this.highlightFeature(e),
      mouseout: (e) => this.resetHighlight(e)
    });
  }

  private highlightFeature(e: any) {
    const layer = e.target;
    layer.setStyle({
      weight: 2,
      color: '#000000',
      fillOpacity: 0.9
    });
  }

  private resetHighlight(e: any) {
    if (this.geojsonLayer) {
      this.geojsonLayer.resetStyle(e.target);
    }
  }
}