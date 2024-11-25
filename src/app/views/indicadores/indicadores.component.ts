import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IndicatorFilterComponent } from '../../components/indicator-filter/indicator-filter.component';
import { MapIndicadoresComponent } from '../../components/map-indicadores/map-indicadores.component';
import { finalize } from 'rxjs';
import { Indicator, MapData } from '../../models/indicator.model';
import { IndicadoresService } from '../../services/indicadores.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-indicadores',
  standalone: true,
  imports: [CommonModule,
    IndicatorFilterComponent,
    MapIndicadoresComponent, MatProgressSpinnerModule],
  templateUrl: './indicadores.component.html',
  styleUrl: './indicadores.component.css'
})
export class IndicadoresComponent implements OnInit {
  indicators: Indicator[] = [];
  mapData: MapData | null = null;
  selectedData: { indicador: string, ano: string } | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(private indicadorService: IndicadoresService) { }

  ngOnInit() {
    this.loadIndicators();
  }

  private loadIndicators() {
    this.isLoading = true;
    this.indicadorService.getIndicators()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (data: Indicator[]) => {
          this.indicators = data;
          this.error = null;
        },
        error: (error) => {
          console.error('Error loading indicators:', error);
          this.error = 'Erro ao carregar os indicadores. Por favor, tente novamente.';
        }
      });
  }

  onFilter(filters: { indicador: string, ano: string }) {
    if (!filters.indicador || !filters.ano) {
      this.error = 'Por favor, selecione um indicador e um ano';
      return;
    }

    this.error = null;
    this.selectedData = filters;
    this.loadMapData(filters);
  }

  private loadMapData(filters: { indicador: string, ano: string }) {
    this.isLoading = true;
    this.indicadorService.getMapData(filters.indicador, filters.ano)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (data: MapData) => {
          this.mapData = data;
          this.error = null;
        },
        error: (error) => {
          console.error('Error loading map data:', error);
          this.error = 'Erro ao carregar os dados do mapa. Por favor, tente novamente.';
          this.mapData = null;
        }
      });
  }
}
