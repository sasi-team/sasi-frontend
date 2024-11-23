
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthFacilityFilterComponent } from '../../../components/health-facility-filter/health-facility-filter.component';
import { HealthFacilityMapComponent } from '../../../components/health-facility-map/health-facility-map.component';
import { EstabelecimentosDeSaude } from '../../../models/health-facility.model';

@Component({
  selector: 'app-dados-abertos-saude-map',
  standalone: true,
  imports: [
    CommonModule,
    HealthFacilityFilterComponent,
    HealthFacilityMapComponent
  ],
  template: `
    <div class="container mx-auto p-2">
      <app-health-facility-filter (filter)="onFilter($event)" (cityChange)="onCityChange($event)"></app-health-facility-filter>
      <button *ngIf="areFiltersFilled()" (click)="toggleMarkers()">Toggle Markers</button>
      <app-health-facility-map [filters]="filters" [cityCoordinates]="cityCoordinates" [displayMarkers]="displayMarkers"></app-health-facility-map>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      margin: 20px;
    }
  `]
})
export class DadosAbertosSaudeMapComponent {
  filters: EstabelecimentosDeSaude = {};
  cityCoordinates: { latitude: number, longitude: number } = { latitude: -14.8639, longitude: -40.8243 };
  displayMarkers: boolean = false;

  onFilter(filters: EstabelecimentosDeSaude) {
    this.filters = { ...filters };
  }

  onCityChange(coordinates: { latitude: number, longitude: number }) {
    this.cityCoordinates = coordinates;
  }

  areFiltersFilled(): boolean {
    return this.filters.codigo_tipo_unidade != null && this.filters.codigo_uf != null;
  }

  toggleMarkers() {
    this.displayMarkers = !this.displayMarkers;
  }
}