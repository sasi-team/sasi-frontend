import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NewsService } from '../../../services/news.service';
import { News } from '../../../models/news.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  newsList: News[] = [];
  displayedNews: News[] = [];
  currentPage = 1;
  limit = 5;
  loading = false;

  constructor(
    private newsService: NewsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadNews(); // Carrega as primeiras notícias
  }

  loadNews(): void {
    if (this.loading) return; // Evita múltiplas requisições simultâneas
    this.loading = true;

    this.newsService.getLatestNews(this.limit, this.currentPage).subscribe({
      next: (news) => {
        // Adiciona notícias somente se ainda não estiverem carregadas
        if (!this.newsList.some((item) => news.find((n) => n.id === item.id))) {
          this.newsList = [...this.newsList, ...news];
        }
        this.updateDisplayedNews();
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar notícias:', err);
        this.loading = false;
      },
    });
  }

  updateDisplayedNews(): void {
    const startIndex = (this.currentPage - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    this.displayedNews = this.newsList.slice(startIndex, endIndex);
  }

  navigate(direction: 'prev' | 'next'): void {
    if (direction === 'next') {
      this.currentPage++;
      const nextPageIndex = (this.currentPage - 1) * this.limit;

      // Carrega novas notícias apenas se a página atual excede as notícias carregadas
      if (nextPageIndex >= this.newsList.length) {
        this.loadNews();
      } else {
        this.updateDisplayedNews(); // Atualiza notícias exibidas
      }
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedNews(); // Atualiza notícias exibidas
    }
  }

  sanitizeImageUrl(imageUrl: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  redirectToNews(link: string): void {
    window.open(link, '_blank');
  }
}
