import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HealthFacilityFilterComponent } from '../../components/health-facility-filter/health-facility-filter.component';
import { HealthFacilityMapComponent } from '../../components/health-facility-map/health-facility-map.component';
import { EstabelecimentosDeSaude } from '../../models/health-facility.model';

@Component({
  selector: 'app-estabelecimentos',
  standalone: true,
  imports: [CommonModule,
    HealthFacilityFilterComponent,
    HealthFacilityMapComponent],
  templateUrl: './estabelecimentos.component.html',
  styleUrl: './estabelecimentos.component.css'
})
export class EstabelecimentosComponent {
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
