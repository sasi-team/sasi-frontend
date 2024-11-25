import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})

export class AuthComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/home']);
    }
  }
}
