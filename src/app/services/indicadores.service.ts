import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Indicator, MapData } from '../models/indicator.model';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getIndicators(): Observable<Indicator[]> {
    return this.http.get<Indicator[]>(`${this.baseUrl}/indicadores/`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getMapData(indicador: string, ano: string): Observable<MapData> {
    if (!indicador || !ano) {
      return throwError(() => new Error('Indicador and ano are required'));
    }

    return this.http.get<MapData>(
      `${this.baseUrl}/generate_map/?id_indicador=${indicador}&ano=${ano}`
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