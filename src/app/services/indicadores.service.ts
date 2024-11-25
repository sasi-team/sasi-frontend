import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Indicator, MapData } from '../models/indicator.model';
import { environment } from '../../enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getIndicators(): Observable<Indicator[]> {
    return this.http.get<Indicator[]>('assets/mocks/indicadores.json')
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getMapData(indicadorId: string, ano: string): Observable<MapData> {
    if (!indicadorId || !ano) {
      return throwError(() => new Error('Indicador e ano são obrigatórios'));
    }

    return this.http.get<MapData>(
      `${this.baseUrl}/assets/mocks/map-data/indicator-${indicadorId}-${ano}.json`
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}