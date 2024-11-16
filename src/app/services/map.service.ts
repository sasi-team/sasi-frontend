import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Indicator, MapData } from '../models/indicator.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getIndicators(): Observable<Indicator[]> {
    return this.http.get<Indicator[]>(`${this.baseUrl}/indicators/`);
  }

  getMapData(indicador: string, ano: string): Observable<MapData> {
    return this.http.get<MapData>(
      `${this.baseUrl}/generate_map/?indicador=${indicador}&ano=${ano}`
    );
  }
}