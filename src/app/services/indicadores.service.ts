import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, of } from "rxjs";
import { catchError, map, tap, retry } from "rxjs/operators";
import { Indicator, MapData } from '../models/indicator.model';
import { environment } from "../../environments/environment";
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {
  private baseUrl = environment.apiUrl;
  private cache: Map<string, any> = new Map();

  constructor(private http: HttpClient, private mockDataService: MockDataService) { }

  getMapData(indicador: string, ano: string): Observable<MapData> {
    if (!indicador || !ano) {
      return throwError(() => new Error('Indicador and ano are required'));
    }

    const cacheKey = `mapData-${indicador}-${ano}`;

    if (environment.useMockData) {
      return this.http.get<MapData>(`assets/mocks/map-data/indicator-${indicador}-${ano}.json`).pipe(
        catchError(error => this.handleError<MapData>('getMapData')(error))
      );
    }

    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey) as MapData);
    }

    const apiUrl = `${this.baseUrl}/generate_map/?id_indicador=${indicador}&ano=${ano}`;
    const mockUrl = `assets/mocks/map-data/indicator-${indicador}-${ano}.json`;

    return this.mockDataService.getData(apiUrl, mockUrl).pipe(
      retry(3),
      tap(data => this.cache.set(cacheKey, data)),
      map(response => response as MapData),
      catchError(this.handleError<MapData>('getMapData'))
    );
  }

  getIndicators(): Observable<Indicator[]> {
    const cacheKey = 'indicators';
  
    if (environment.useMockData) {
      return this.http.get<Indicator[]>('assets/mocks/indicadores.json').pipe(
        map(response => response as Indicator[]),
        catchError(this.handleError<Indicator[]>('getIndicators', []))
      );
    }
  
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey) as Indicator[]);
    }
  
    const apiUrl = `${this.baseUrl}/indicadores/`;
    const mockUrl = 'assets/mocks/indicadores.json';

    return this.mockDataService.getData(apiUrl, mockUrl).pipe(
      retry(3),
      tap(indicators => this.cache.set(cacheKey, indicators)),
      catchError(this.handleError<Indicator[]>('getIndicators', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }
}