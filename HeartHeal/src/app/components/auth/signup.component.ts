import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container fade-in">
      <div class="auth-card card">
        <div class="auth-header">
          <h1>💕 Join HeartHeal</h1>
          <p>Start your healing journey today</p>
        </div>

        <form (ngSubmit)="onSignup()" class="auth-form">
          <div class="form-group">
            <label>Your Name</label>
            <input 
              type="text"
              [(ngModel)]="name"
              name="name"
              placeholder="What should we call you?"
              class="input-field"
              required>
          </div>

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
              placeholder="At least 6 characters"
              class="input-field"
              required>
          </div>

          <div class="form-group">
            <label>Confirm Password</label>
            <input 
              type="password"
              [(ngModel)]="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              class="input-field"
              required>
          </div>

          <div class="error-message" *ngIf="errorMessage">
            ⚠️ {{errorMessage}}
          </div>

          <div class="success-message" *ngIf="successMessage">
            ✓ {{successMessage}}
          </div>

          <button type="submit" class="btn-primary full-width" 
                  [disabled]="!name || !email || !password || !confirmPassword">
            Create Account
          </button>
        </form>

        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/login">Login here</a></p>
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

    .success-message {
      padding: 12px 20px;
      background: #e8f8f5;
      border-left: 4px solid #4ade80;
      border-radius: 8px;
      color: #27ae60;
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
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

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

  onSignup() {
    this.errorMessage = '';
    this.successMessage = '';

    // Validate passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const result = this.authService.signup(this.email, this.password, this.name);

    if (result.success) {
      this.successMessage = result.message;
      // Redirect to payment page after signup
      setTimeout(() => {
        this.router.navigate(['/payment']);
      }, 1500);
    } else {
      this.errorMessage = result.message;
    }
  }
}