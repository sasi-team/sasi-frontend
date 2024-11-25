import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { News } from '../models/news.model';


@Injectable({
    providedIn: 'root',
})
export class NewsService {
    private apiUrl = 'https://servicodados.ibge.gov.br/api/v3/noticias/';

    constructor(private http: HttpClient) { }

    getLatestNews(limit: number = 5, page: number = 1): Observable<News[]> {
        return this.http
            .get<{ items: any[] }>(`${this.apiUrl}?qtd=${limit}&page=${page}`)
            .pipe(
                map((response) =>
                    response.items.map((item) => ({
                        id: item.id,
                        titulo: item.titulo,
                        introducao: item.introducao,
                        data_publicacao: this.formatDate(item.data_publicacao),
                        imagens: this.getImageUrl(item.imagens),
                        link: item.link,
                    }))
                )
            );
    }

    private getImageUrl(imagens: string): string {
        try {
            const parsedImages = JSON.parse(imagens);
            return `https://www.ibge.gov.br/${parsedImages.image_intro || parsedImages.image_fulltext}`;
        } catch (error) {
            console.error('Erro ao parsear imagens:', error);
            return '';
        }
    }

    private formatDate(dateString: string): string {
        const [day, month, yearAndTime] = dateString.split('/');
        const [year] = yearAndTime.split(' ');
        return `${day}/${month}/${year}`;
    }
}
