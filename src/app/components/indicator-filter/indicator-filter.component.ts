import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Indicator } from '../../models/indicator.model';
import { IndicadoresService } from '../../services/indicadores.service';

@Component({
  selector: 'app-indicator-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
    <div class="bg-white p-4 rounded-lg shadow mb-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <mat-form-field>
          <mat-label>Indicador</mat-label>
          <mat-select [(ngModel)]="selectedIndicator">
            <mat-option *ngFor="let indicator of indicators" [value]="indicator.id">
              {{indicator.titulo}}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Ano</mat-label>
          <mat-select [(ngModel)]="selectedYear">
            <mat-option *ngFor="let year of years" [value]="year">
              {{year}}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <button mat-raised-button color="primary" 
                (click)="onSubmit()"
                [disabled]="!selectedIndicator || !selectedYear">
          Buscar
        </button>
      </div>
    </div>
  `
})
export class IndicatorFilterComponent implements OnInit {
  @Output() filter = new EventEmitter<{indicador: string, ano: string}>();
  
  indicators: Indicator[] = [];
  years: number[] = [];
  selectedIndicator: string = '';
  selectedYear: string = '';

  constructor(private indicatorService: IndicadoresService) {}

  ngOnInit() {
    this.loadIndicators();
    this.populateYears();
  }

  private populateYears() {
    this.years = Array.from({length: 11}, (_, i) => 2010 + i);
  }

  private loadIndicators() {
    this.indicatorService.getIndicators().subscribe(
      indicators => this.indicators = indicators
    );
  }

  onSubmit() {
    if (this.selectedIndicator && this.selectedYear) {
      this.filter.emit({
        indicador: this.selectedIndicator,
        ano: this.selectedYear
      });
    }
  }
}