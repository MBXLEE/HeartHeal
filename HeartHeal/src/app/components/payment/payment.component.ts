import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="payment-container fade-in">
      <div class="payment-card card">
        <div class="payment-header">
          <h1>💝 Unlock HeartHeal</h1>
          <p>One-time payment for lifetime access</p>
        </div>

        <div class="payment-content">
          <div class="price-section">
            <div class="price">R50</div>
            <div class="price-subtitle">One Time Payment</div>
          </div>

          <div class="benefits">
            <h3>What you'll get:</h3>
            <ul>
              <li>✓ Unlimited chatbot conversations</li>
              <li>✓ Personalized affirmations</li>
              <li>✓ Goal tracking & accountability</li>
              <li>✓ Journaling features</li>
              <li>✓ Progress analytics</li>
              <li>✓ Lifetime updates</li>
            </ul>
          </div>

          <button class="btn-primary full-width" (click)="processPayment()" [disabled]="processing">
            {{ processing ? 'Processing...' : 'Pay R50 & Get Access' }}
          </button>

          <div class="error-message" *ngIf="errorMessage">
            ⚠️ {{errorMessage}}
          </div>

          <div class="success-message" *ngIf="successMessage">
            ✓ {{successMessage}}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payment-container {
      min-height: calc(100vh - 100px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }

    .payment-card {
      max-width: 500px;
      width: 100%;
    }

    .payment-header {
      text-align: center;
      margin-bottom: 35px;
    }

    .payment-header h1 {
      font-size: 32px;
      margin-bottom: 10px;
      background: linear-gradient(135deg, #ff69b4, #d8a7d8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .payment-header p {
      color: var(--text-light);
      font-size: 16px;
    }

    .price-section {
      text-align: center;
      margin-bottom: 30px;
      padding: 20px;
      background: var(--pale-pink);
      border-radius: 12px;
    }

    .price {
      font-size: 48px;
      font-weight: bold;
      color: var(--primary-pink);
    }

    .price-subtitle {
      color: var(--text-light);
      font-size: 14px;
    }

    .benefits {
      margin-bottom: 30px;
    }

    .benefits h3 {
      margin-bottom: 15px;
      color: var(--text-dark);
    }

    .benefits ul {
      list-style: none;
      padding: 0;
    }

    .benefits li {
      padding: 8px 0;
      color: var(--text-light);
    }

    .error-message {
      padding: 12px 20px;
      background: #fee;
      border-left: 4px solid #e74c3c;
      border-radius: 8px;
      color: #c0392b;
      font-size: 14px;
      margin-top: 15px;
    }

    .success-message {
      padding: 12px 20px;
      background: #e8f8f5;
      border-left: 4px solid #4ade80;
      border-radius: 8px;
      color: #27ae60;
      font-size: 14px;
      margin-top: 15px;
    }

    .full-width {
      width: 100%;
    }

    @media (max-width: 768px) {
      .payment-container {
        padding: 20px 15px;
      }

      .payment-header h1 {
        font-size: 28px;
      }

      .price {
        font-size: 36px;
      }
    }
  `]
})
export class PaymentComponent {
  processing = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async processPayment() {
    this.processing = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Simulate payment processing
    setTimeout(() => {
      const result = this.authService.processPayment();
      
      if (result.success) {
        this.successMessage = result.message;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      } else {
        this.errorMessage = result.message;
      }
      
      this.processing = false;
    }, 1500);
  }
}