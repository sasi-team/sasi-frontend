import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EstabelecimentosDeSaude, Cidade } from '../../models/health-facility.model';
import { EstabelecimentosSaudeService } from '../../services/health-facilities.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-health-facility-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './health-facility-filter.component.html',
  styleUrl: './health-facility-filter.component.css'
})

export class HealthFacilityFilterComponent implements OnInit {
  filterForm!: FormGroup;

  cidades: Cidade[] = [];
  filteredCidades!: Observable<Cidade[]>;
  tiposUnidade: { codigo_tipo_unidade: number, descricao_tipo_unidade: string }[] = [];

  @Output() filter = new EventEmitter<EstabelecimentosDeSaude>();
  @Output() cityChange = new EventEmitter<{ latitude: number, longitude: number }>();
  @Output() toggleMarkersEvent = new EventEmitter<boolean>();

  showFilters = false;
  showMarkers = false;

  constructor(private _service: EstabelecimentosSaudeService) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      cidade: new FormControl(),
      tipoUnidade: new FormControl()
    });

    this.loadCidades();
    this.loadTiposUnidade();

    this.filteredCidades = this.filterForm.get('cidade')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCidades(value))
    );
  }

  private _filterCidades(value: string | null): Cidade[] {
    if (!value) {
      return this.cidades;
    }
    const filterValue = value.toLowerCase();
    return this.cidades.filter(cidade => cidade.nome.toLowerCase().includes(filterValue));
  }

  loadCidades() {
    this._service.getCidades().subscribe(response => {
      console.log(response);
      this.cidades = response.map(cidade => ({
        ...cidade,
        latitude: cidade.latitude,
        longitude: cidade.longitude
      }));
    });
  }

  loadTiposUnidade() {
    this._service.getTiposUnidade().subscribe(response => {
      this.tiposUnidade = response;
    });
  }

  onFilter() {
    const filters: EstabelecimentosDeSaude = {
      codigo_municipio: this.filterForm.get('cidade')!.value,
      codigo_tipo_unidade: this.filterForm.get('tipoUnidade')!.value,
      limit: 100,
      offset: 0
    };
    this.filter.emit(filters);
    this.toggleMarkersEvent.emit(this.showMarkers);
  }

  onClear() {
    this.filterForm.reset();
    this.filter.emit({
      codigo_municipio: undefined,
      codigo_tipo_unidade: undefined,
      limit: 100,
      offset: 0
    });
    this.cityChange.emit({ latitude: -14.8639, longitude: -40.8243 });
  }

  onCityChange(codigo_ibge: string) {
    const cidade = this.cidades.find(c => c.codigo_ibge === codigo_ibge);
    if (cidade) {
      this.cityChange.emit({ latitude: cidade.latitude, longitude: cidade.longitude });
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  toggleMarkers() {
    this.showMarkers = !this.showMarkers;
    this.toggleMarkersEvent.emit(this.showMarkers);
  }
}