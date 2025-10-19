import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container fade-in">
      <div class="hero-section card">
        <h1 class="hero-title">💖 Welcome to HeartHeal</h1>
        <p class="hero-subtitle">Your daily companion for healing and growth after a breakup</p>
        <div class="hero-price">
          <span class="price">R50</span>
          <span class="price-text">One-time payment • Lifetime access</span>
        </div>
      </div>

      <div class="features-grid">
        <div class="feature-card card" *ngFor="let feature of features">
          <div class="feature-icon">{{feature.icon}}</div>
          <h3>{{feature.title}}</h3>
          <p>{{feature.description}}</p>
          <button class="btn-primary" [routerLink]="feature.route">{{feature.buttonText}}</button>
        </div>
      </div>

      <div class="motivation-section card">
        <h2>You've got this! 💪</h2>
        <p>Healing takes time, but you're not alone. Every day is a step forward.</p>
        <div class="stats">
          <div class="stat">
            <span class="stat-number">{{daysClean}}</span>
            <span class="stat-label">Days No Contact</span>
          </div>
          <div class="stat">
            <span class="stat-number">{{goalsCompleted}}</span>
            <span class="stat-label">Goals Achieved</span>
          </div>
          <div class="stat">
            <span class="stat-number">{{journalEntries}}</span>
            <span class="stat-label">Journal Entries</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 20px 0;
    }

    .hero-section {
      text-align: center;
      padding: 50px 30px;
      background: linear-gradient(135deg, rgba(255, 105, 180, 0.1), rgba(255, 182, 217, 0.1));
    }

    .hero-title {
      font-size: 42px;
      margin-bottom: 15px;
      background: linear-gradient(135deg, #ff69b4, #d8a7d8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 20px;
      color: var(--text-light);
      margin-bottom: 30px;
    }

    .hero-price {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .price {
      font-size: 48px;
      font-weight: 700;
      color: var(--primary-pink);
    }

    .price-text {
      color: var(--text-light);
      font-size: 16px;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
      margin: 30px 0;
    }

    .feature-card {
      text-align: center;
      padding: 35px 25px;
      transition: all 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 12px 30px rgba(255, 105, 180, 0.3);
    }

    .feature-icon {
      font-size: 50px;
      margin-bottom: 20px;
    }

    .feature-card h3 {
      margin-bottom: 15px;
      font-size: 22px;
    }

    .feature-card p {
      color: var(--text-light);
      margin-bottom: 25px;
      line-height: 1.6;
    }

    .feature-card button {
      width: 100%;
      max-width: 200px;
    }

    .motivation-section {
      text-align: center;
      padding: 40px 30px;
      background: linear-gradient(135deg, rgba(216, 167, 216, 0.1), rgba(255, 105, 180, 0.1));
    }

    .motivation-section h2 {
      font-size: 32px;
      margin-bottom: 15px;
    }

    .motivation-section > p {
      font-size: 18px;
      color: var(--text-light);
      margin-bottom: 35px;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 50px;
      flex-wrap: wrap;
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-number {
      font-size: 40px;
      font-weight: 700;
      color: var(--primary-pink);
      margin-bottom: 10px;
    }

    .stat-label {
      font-size: 14px;
      color: var(--text-light);
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 32px;
      }

      .hero-subtitle {
        font-size: 18px;
      }

      .price {
        font-size: 36px;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .stats {
        gap: 30px;
      }
    }
  `]
})
export class HomeComponent {
  daysClean = 0;
  goalsCompleted = 0;
  journalEntries = 0;

  features = [
    {
      icon: '💬',
      title: 'Reality Check Chatbot',
      description: 'Thinking about texting them? Our chatbot will snap you back to reality with some tough love.',
      route: '/chatbot',
      buttonText: 'Try Chat'
    },
    {
      icon: '✅',
      title: 'Accountability Tracker',
      description: 'Track your progress staying away from their social media. Every day counts!',
      route: '/accountability',
      buttonText: 'Track Progress'
    },
    {
      icon: '✨',
      title: 'Daily Affirmations',
      description: 'Start your day with powerful reminders of your worth and strength.',
      route: '/affirmations',
      buttonText: 'Get Inspired'
    },
    {
      icon: '🎯',
      title: 'Recovery Goals',
      description: 'Set goals to keep moving forward and not lose yourself in the sadness.',
      route: '/goals',
      buttonText: 'Set Goals'
    },
    {
      icon: '📔',
      title: 'Daily Journal',
      description: 'Write about your feelings and track your emotional journey.',
      route: '/journal',
      buttonText: 'Start Writing'
    },
    {
      icon: '📈',
      title: 'Progress & Rewards',
      description: 'See how far you\'ve come and reward yourself for staying strong.',
      route: '/progress',
      buttonText: 'View Progress'
    }
  ];

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    const accountability = JSON.parse(localStorage.getItem('accountability') || '{}');
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    const journal = JSON.parse(localStorage.getItem('journal') || '[]');

    this.daysClean = accountability.daysClean || 0;
    this.goalsCompleted = goals.filter((g: any) => g.completed).length;
    this.journalEntries = journal.length;
  }
}