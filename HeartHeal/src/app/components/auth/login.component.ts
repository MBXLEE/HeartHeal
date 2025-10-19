import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container fade-in">
      <div class="auth-card card">
        <div class="auth-header">
          <h1>💖 Welcome Back</h1>
          <p>Login to continue your healing journey</p>
        </div>

        <form (ngSubmit)="onLogin()" class="auth-form">
          <div class="form-group">
            <label>Email Address</label>
            <input 
              type="email"
              [(ngModel)]="email"
              name="email"
              placeholder="your@email.com"
              class="input-field"
              required>
          </div>

          <div class="form-group">
            <label>Password</label>
            <input 
              type="password"
              [(ngModel)]="password"
              name="password"
              placeholder="••••••••"
              class="input-field"
              required>
          </div>

          <div class="error-message" *ngIf="errorMessage">
            ⚠️ {{errorMessage}}
          </div>

          <button type="submit" class="btn-primary full-width" [disabled]="!email || !password">
            Login
          </button>
        </form>

        <div class="auth-footer">
          <p>Don't have an account? <a routerLink="/signup">Sign up here</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: calc(100vh - 100px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }

    .auth-card {
      max-width: 450px;
      width: 100%;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 35px;
    }

    .auth-header h1 {
      font-size: 32px;
      margin-bottom: 10px;
      background: linear-gradient(135deg, #ff69b4, #d8a7d8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .auth-header p {
      color: var(--text-light);
      font-size: 16px;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-group label {
      font-weight: 600;
      color: var(--text-dark);
      font-size: 14px;
    }

    .error-message {
      padding: 12px 20px;
      background: #fee;
      border-left: 4px solid #e74c3c;
      border-radius: 8px;
      color: #c0392b;
      font-size: 14px;
    }

    .full-width {
      width: 100%;
      margin-top: 10px;
    }

    .auth-footer {
      text-align: center;
      margin-top: 25px;
      padding-top: 25px;
      border-top: 2px solid var(--pale-pink);
    }

    .auth-footer p {
      color: var(--text-light);
    }

    .auth-footer a {
      color: var(--primary-pink);
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    .auth-footer a:hover {
      color: var(--accent-purple);
    }

    @media (max-width: 768px) {
      .auth-container {
        padding: 20px 15px;
      }

      .auth-header h1 {
        font-size: 28px;
      }
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      if (this.authService.hasAccess()) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/payment']);
      }
    }
  }

  onLogin() {
    this.errorMessage = '';

    const result = this.authService.login(this.email, this.password);

    if (result.success) {
      // Check if user has paid
      if (this.authService.hasAccess()) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/payment']);
      }
    } else {
      this.errorMessage = result.message;
    }
  }
}