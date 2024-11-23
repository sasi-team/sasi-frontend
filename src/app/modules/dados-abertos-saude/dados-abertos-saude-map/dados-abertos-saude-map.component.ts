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
    <app-health-facility-filter (filter)="onFilter($event)"></app-health-facility-filter>
    <app-health-facility-map [filters]="filters"></app-health-facility-map>
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

  onFilter(filters: EstabelecimentosDeSaude) {
    this.filters = { ...filters };
  }
}