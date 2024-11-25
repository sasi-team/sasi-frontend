import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'sasi-frontend';
  showHeader: boolean = false;
  showFooter: boolean = false;

  // Define a rota pública
  publicRoute: string = '/login'; // Rota para o LoginComponent

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Monitorar eventos de navegação
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verifica se a rota atual é diferente da rota pública
        this.showHeader = event.urlAfterRedirects !== this.publicRoute;
        this.showFooter = event.urlAfterRedirects !== this.publicRoute;
      }
    });
  }
}