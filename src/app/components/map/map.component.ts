import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../ui/header/header.component';
import { SidebarComponent } from '../ui/sidebar/sidebar.component';
import { FilterComponent } from '../ui/filter/filter.component';
import { Indicator } from '../../models/indicator.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, HeaderComponent, SidebarComponent, FilterComponent],
  templateUrl: './map.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private geojsonLayer?: L.GeoJSON;
  indicadores: Indicator[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.map = L.map('map').setView([-12.9704, -38.5124], 10); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.loadIndicadores();
  }

  loadIndicadores() {
    const url = 'http://localhost:8000/api/indicadores/';
    this.http.get(url).subscribe((data: any) => {
      this.indicadores = data;
      console.log(this.indicadores);
    });
  }

  onSearch(values: { indicador: string, ano: string }) {
    const url = `http://localhost:8000/api/generate_map/?id_indicador=${values.indicador}&ano=${values.ano}`;
    this.http.get(url).subscribe((data: any) => {
      if (this.geojsonLayer) {
        this.map.removeLayer(this.geojsonLayer);
      }
      this.geojsonLayer = L.geoJSON(data, {
        style: (feature) => this.styleFunction(feature),
        onEachFeature: (feature, layer) => this.onEachFeature(feature, layer)
      }).addTo(this.map);
      this.map.fitBounds(this.geojsonLayer.getBounds());
    });
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
        {
          sticky: true
        }
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
    this.geojsonLayer?.resetStyle(e.target);
  }
}