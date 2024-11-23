import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Cidade, EstabelecimentoResponse, EstabelecimentosDeSaude, TipoUnidade } from "../models/health-facility.model";
import { environment } from "../../enviroments/enviroment.prod";

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentosSaudeService {
  private baseUrl = environment.apiUrl;
  private cache: Map<string, any> = new Map();

  constructor(private http: HttpClient) {}

  getEstabelecimentos(params: EstabelecimentosDeSaude = {}): Observable<any> {
    if (environment.useMockData) {
      return this.http.get<EstabelecimentoResponse>('assets/mocks/estabelecimentos.json');
    }

    const defaultParams: EstabelecimentosDeSaude = {
      limit: 1000,
      offset: 0
    };

    const queryParams = {
      ...defaultParams,
      ...Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== null)
      )
    };

    const httpParams = new HttpParams({ fromObject: queryParams as { [key: string]: string | number } });
    const cacheKey = `estabelecimentos-${JSON.stringify(queryParams)}`;

    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    return this.http.get(`${this.baseUrl}/estabelecimentos/`, { params: httpParams })
      .pipe(
        tap(response => this.cache.set(cacheKey, response)),
        catchError(this.handleError('getEstabelecimentos'))
      );
  }

  getPaginatedHealthFacilities(
    params: EstabelecimentosDeSaude = {}, 
    pageSize: number = 100,
    maxItems: number = 1000 // Limit total items to prevent memory issues
  ): Observable<EstabelecimentosDeSaude[]> {
    if (environment.useMockData) {
      return this.http.get<{ estabelecimentos: EstabelecimentosDeSaude[] }>('assets/mocks/estabelecimentos.json')
        .pipe(map(response => response.estabelecimentos.slice(0, maxItems)));
    }

    return new Observable<EstabelecimentosDeSaude[]>(observer => {
      const allFacilities: EstabelecimentosDeSaude[] = [];
      let currentOffset = 0;

      const fetchPage = () => {
        if (allFacilities.length >= maxItems) {
          observer.next(allFacilities);
          observer.complete();
          return;
        }

        this.getEstabelecimentos({
          ...params,
          limit: pageSize,
          offset: currentOffset
        }).subscribe({
          next: (response) => {
            if (!response.estabelecimentos?.length) {
              observer.next(allFacilities);
              observer.complete();
              return;
            }

            allFacilities.push(...response.estabelecimentos);
            currentOffset += pageSize;
            fetchPage();
          },
          error: (error) => {
            console.error('Error in pagination:', error);
            observer.error(error);
          }
        });
      };

      fetchPage();
    });
  }

  getCidades(): Observable<Cidade[]> {
    const cacheKey = 'cidades';
    
    if (environment.useMockData) {
      return this.http.get<{ cidades: Cidade[] }>('assets/mocks/cidades.json')
        .pipe(map(response => response.cidades));
    }

    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    return this.http.get<{ cidades: Cidade[] }>(`${this.baseUrl}/cidades/`)
      .pipe(
        map(response => response.cidades),
        tap(cidades => this.cache.set(cacheKey, cidades)),
        catchError(this.handleError('getCidades', []))
      );
  }

  getTiposUnidade(): Observable<TipoUnidade[]> {
    const cacheKey = 'tipos_unidade';

    if (environment.useMockData) {
      return this.http.get<{ tipos_unidade: TipoUnidade[] }>('assets/mocks/tipos-unidade.json')
        .pipe(map(response => response.tipos_unidade));
    }

    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    return this.http.get<{ tipos_unidade: TipoUnidade[] }>(`${this.baseUrl}/tipos_unidade/`)
      .pipe(
        map(response => response.tipos_unidade),
        tap(tipos => this.cache.set(cacheKey, tipos)),
        catchError(this.handleError('getTiposUnidade', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

  clearCache() {
    this.cache.clear();
  }
}