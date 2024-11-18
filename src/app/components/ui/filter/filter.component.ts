import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Indicator as Indicador } from '../../../models/indicator.model';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, MatSelectModule, MatButtonModule],
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  @Input() indicadores: Indicador[] = [];
  @Output() selectedValues = new EventEmitter<{ indicador: string, ano: string }>();

  anos = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
  indicador: string = '';
  ano: string = '';

  search() {
    this.selectedValues.emit({ indicador: this.indicador, ano: this.ano });
  }
}