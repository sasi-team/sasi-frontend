import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false; // Controla a visibilidade do menu
  menuIcon = 'menu'; // Controla o ícone exibido no botão

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Alterna o valor booleano do controle de visibilidade
    this.menuIcon = this.isMenuOpen ? 'close' : 'menu'; // Muda o ícone do menu
  }
}