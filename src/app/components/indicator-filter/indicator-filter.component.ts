import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Indicator } from '../../models/indicator.model';
import { IndicadoresService } from '../../services/indicadores.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-indicator-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './indicator-filter.component.html',
  styleUrl: './indicator-filter.component.css',
})
export class IndicatorFilterComponent implements OnInit {
  @Output() filter = new EventEmitter<{ indicador: string, ano: string }>();

  indicators: Indicator[] = [];
  years: number[] = [];
  selectedIndicator: string = '';
  selectedYear: string = '';

  constructor(private indicatorService: IndicadoresService) { }

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