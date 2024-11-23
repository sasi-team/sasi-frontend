import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

export interface HealthFacilityParams {
  codigo_tipo_unidade?: number;
  codigo_uf?: number;
  codigo_municipio?: number;
  status?: 0 | 1;
  estabelecimento_possui_centro_cirurgico?: 0 | 1;
  estabelecimento_possui_centro_obstetrico?: 0 | 1;
  limit?: number;
  offset?: number;
}

export interface HealthFacility {
  codigo_cnes: number;
  nome_fantasia: string;
  endereco_estabelecimento: string;
  numero_estabelecimento: string;
  bairro_estabelecimento: string;
  latitude_estabelecimento_decimo_grau: number;
  longitude_estabelecimento_decimo_grau: number;
  [key: string]: any;
}

interface HealthFacilityResponse {
  estabelecimentos: HealthFacility[];
}

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentosSaudeService {
  private baseUrl = 'http://localhost:8000/api/estabelecimentos/';

  constructor(private http: HttpClient) {}

  getEstabelecimentos(params: HealthFacilityParams = {}): Observable<HealthFacilityResponse> {
    const defaultParams: HealthFacilityParams = {
      limit: 1000,
      offset: 0
    };

    const queryParams = {
      ...defaultParams,
      ...Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined)
      )
    };

    const httpParams = new HttpParams({
      fromObject: queryParams as { [key: string]: string | number }
    });

    return this.http.get<HealthFacilityResponse>(this.baseUrl, { params: httpParams })
      .pipe(
        catchError(error => {
          console.error('Error fetching health facilities:', error);
          return throwError(() => new Error('Failed to fetch health facilities'));
        })
      );
  }

  getPaginatedHealthFacilities(
    params: HealthFacilityParams = {}, 
    pageSize: number = 100
  ): Observable<HealthFacility[]> {
    return new Observable<HealthFacility[]>(observer => {
      const allFacilities: HealthFacility[] = [];
      let currentOffset = 0;

      const fetchPage = () => {
        this.getEstabelecimentos({
          ...params,
          limit: pageSize,
          offset: currentOffset
        }).subscribe({
          next: (response) => {
            if (response.estabelecimentos.length === 0) {
              observer.next(allFacilities);
              observer.complete();
              return;
            }

            allFacilities.push(...response.estabelecimentos);
            currentOffset += pageSize;
            fetchPage();
          },
          error: (error) => observer.error(error)
        });
      };

      fetchPage();
    });
  }
}