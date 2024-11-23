import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { EstabelecimentoResponse, EstabelecimentosDeSaude } from "../models/health-facility.model";


@Injectable({
  providedIn: 'root'
})
export class EstabelecimentosSaudeService {
  private baseUrl = 'http://localhost:8000/api/estabelecimentos/';

  constructor(private http: HttpClient) {}

  getEstabelecimentos(params: EstabelecimentosDeSaude = {}): Observable<EstabelecimentoResponse> {
    const defaultParams: EstabelecimentosDeSaude = {
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

    return this.http.get<EstabelecimentoResponse>(this.baseUrl, { params: httpParams })
      .pipe(
        catchError(error => {
          console.error('Error fetching health facilities:', error);
          return throwError(() => new Error('Failed to fetch health facilities'));
        })
      );
  }

  getPaginatedHealthFacilities(
    params: EstabelecimentosDeSaude = {}, 
    pageSize: number = 100
  ): Observable<EstabelecimentosDeSaude[]> {
    return new Observable<EstabelecimentosDeSaude[]>(observer => {
      const allFacilities: EstabelecimentosDeSaude[] = [];
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