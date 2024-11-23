import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  constructor(private http: HttpClient) {}

  getIndicadores(): Observable<any> {
    if (environment.useMockData) {
      return this.http.get('assets/mocks/indicadores.json');
    }
    return this.http.get(`${environment.apiUrl}/indicadores/`);
  }

  getTiposUnidade(): Observable<any> {
    if (environment.useMockData) {
      return this.http.get('assets/mocks/tipos-unidade.json');
    }
    return this.http.get(`${environment.apiUrl}/tipos_unidade/`);
  }

  getCidades(): Observable<any> {
    if (environment.useMockData) {
      return this.http.get('assets/mocks/cidades.json');
    }
    return this.http.get(`${environment.apiUrl}/cidades/`);
  }

  getMapData(indicadorId: string, ano: string): Observable<any> {
    if (environment.useMockData) {
      return this.http.get(`assets/mocks/map-data/indicator-${indicadorId}-${ano}.json`);
    }
    return this.http.get(`${environment.apiUrl}/generate_map/?id_indicador=${indicadorId}&ano=${ano}`);
  }

  getEstabelecimentos(params: any): Observable<any> {
    if (environment.useMockData) {
      return this.http.get(`assets/mocks/estabelecimentos/${params.codigo_municipio}.json`);
    }
    return this.http.get(`${environment.apiUrl}/estabelecimentos/`, { params });
  }
}