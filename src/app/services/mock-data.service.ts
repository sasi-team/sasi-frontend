import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  constructor(private http: HttpClient) {}

  getIndicadores(): Observable<any> {
    return this.getData(`${environment.apiUrl}/indicadores/`, 'assets/mocks/indicadores.json');
  }

  getTiposUnidade(): Observable<any> {
    return this.getData(`${environment.apiUrl}/tipos_unidade/`, 'assets/mocks/tipos-unidade.json');
  }

  getCidades(): Observable<any> {
    return this.getData(`${environment.apiUrl}/cidades/`, 'assets/mocks/cidades.json');
  }

  getMapData(indicadorId: string, ano: string): Observable<any> {
    return this.getData(`assets/mocks/map-data/indicator-${indicadorId}-${ano}.json`, `${environment.apiUrl}/generate_map/?id_indicador=${indicadorId}&ano=${ano}`);
  }

  getEstabelecimentos(params: any): Observable<any> {
    return this.getDataWithParams(`${environment.apiUrl}/estabelecimentos/`, `assets/mocks/estabelecimentos/${params.codigo_municipio}.json`, params);
  }

  getData(apiUrl: string, mockUrl: string): Observable<any> {
    if (environment.useMockData) {
      return this.http.get(mockUrl);
    }
    return this.http.get(apiUrl);
  }

  getDataWithParams(apiUrl: string, mockUrl: string, params: any): Observable<any> {
    if (environment.useMockData) {
      return this.http.get(mockUrl);
    }
    return this.http.get(apiUrl, { params });
  }
}