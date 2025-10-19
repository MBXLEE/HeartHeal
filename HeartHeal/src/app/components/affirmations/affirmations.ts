import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-affirmations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="affirmations-container fade-in">
      <div class="card header-section">
        <h2>✨ Daily Affirmations</h2>
        <p>Start your day with powerful reminders of your worth and strength</p>
      </div>

      <div class="card daily-affirmation">
        <div class="affirmation-icon">💖</div>
        <h3>Your Affirmation for Today</h3>
        <p class="affirmation-text">{{todayAffirmation}}</p>
        <button class="btn-primary" (click)="getNewAffirmation()">
          Get Another One ✨
        </button>
      </div>

      <div class="affirmations-list">
        <h3 class="list-title">All Affirmations</h3>
        <div class="affirmation-grid">
          <div class="card affirmation-item" *ngFor="let affirmation of affirmations; let i = index">
            <div class="affirmation-number">{{i + 1}}</div>
            <p>{{affirmation}}</p>
          </div>
        </div>
      </div>

      <div class="card tips-section">
        <h3>💫 How to Use Affirmations</h3>
        <ul>
          <li>Read your daily affirmation every morning</li>
          <li>Say it out loud with conviction</li>
          <li>Write it down in your journal</li>
          <li>Set it as your phone wallpaper or lock screen</li>
          <li>Repeat it whenever you feel weak or sad</li>
          <li>Believe it, because it's TRUE! 👑</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .affirmations-container {
      max-width: 900px;
      margin: 0 auto;
    }

    .header-section {
      text-align: center;
      margin-bottom: 25px;
    }

    .header-section h2 {
      margin-bottom: 10px;
    }

    .header-section p {
      color: var(--text-light);
      font-size: 16px;
    }

    .daily-affirmation {
      text-align: center;
      padding: 50px 30px;
      background: linear-gradient(135deg, rgba(255, 105, 180, 0.1), rgba(216, 167, 216, 0.1));
      margin-bottom: 40px;
    }

    .affirmation-icon {
      font-size: 60px;
      margin-bottom: 20px;
    }

    .daily-affirmation h3 {
      font-size: 24px;
      margin-bottom: 25px;
    }

    .affirmation-text {
      font-size: 28px;
      line-height: 1.6;
      color: var(--text-dark);
      font-weight: 500;
      margin-bottom: 30px;
      font-style: italic;
      padding: 0 20px;
    }

    .list-title {
      text-align: center;
      font-size: 28px;
      color: var(--primary-pink);
      margin-bottom: 30px;
    }

    .affirmation-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .affirmation-item {
      padding: 25px;
      position: relative;
      transition: all 0.3s ease;
      border-left: 4px solid var(--primary-pink);
    }

    .affirmation-item:hover {
      transform: translateX(5px);
      border-left-color: var(--accent-purple);
    }

    .affirmation-number {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: var(--light-pink);
      color: var(--primary-pink);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
    }

    .affirmation-item p {
      margin: 0;
      line-height: 1.6;
      color: var(--text-dark);
      padding-right: 40px;
    }

    .tips-section {
      background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 182, 193, 0.1));
      border-left: 4px solid #ffd700;
    }

    .tips-section h3 {
      margin-bottom: 20px;
      color: #d4af37;
    }

    .tips-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .tips-section li {
      padding: 12px 0;
      padding-left: 30px;
      position: relative;
      color: var(--text-dark);
      line-height: 1.6;
    }

    .tips-section li:before {
      content: "✨";
      position: absolute;
      left: 0;
      font-size: 18px;
    }

    @media (max-width: 768px) {
      .affirmation-text {
        font-size: 22px;
        padding: 0 10px;
      }

      .affirmation-grid {
        grid-template-columns: 1fr;
      }

      .daily-affirmation {
        padding: 40px 20px;
      }
    }
  `]
})
export class AffirmationsComponent {
  todayAffirmation = '';

  affirmations = [
    "I am worthy of love and respect, especially from myself.",
    "This breakup doesn't define me. I define myself.",
    "I am healing more and more each day.",
    "I deserve someone who chooses me every single day.",
    "My worth isn't determined by someone else's inability to see it.",
    "I am strong enough to let go of what's hurting me.",
    "Every day without contact is a day of growth.",
    "I am reclaiming my power and my peace.",
    "This pain is temporary, but my strength is permanent.",
    "I choose myself, my happiness, and my future.",
    "I am not broken, I am breaking through.",
    "My best days are still ahead of me.",
    "I release what no longer serves me with love.",
    "I am enough, I have always been enough.",
    "I trust the timing of my life.",
    "I am creating space for something better.",
    "My happiness doesn't depend on anyone else.",
    "I am brave for walking away from what wasn't right.",
    "I honor my feelings without letting them control me.",
    "I am becoming the person I've always wanted to be.",
    "This ending is creating space for a beautiful beginning.",
    "I refuse to shrink myself for anyone.",
    "My heart is healing, and I am moving forward.",
    "I am deserving of a love that stays.",
    "I choose growth over comfort.",
    "I am the author of my own story.",
    "I will not beg for the love I deserve.",
    "My peace is more important than closure.",
    "I am grateful for the lessons this relationship taught me.",
    "I am rediscovering who I am, and I love her."
  ];

  ngOnInit() {
    this.loadDailyAffirmation();
  }

  loadDailyAffirmation() {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('dailyAffirmation');
    
    if (saved) {
      const data = JSON.parse(saved);
      if (data.date === today) {
        this.todayAffirmation = data.affirmation;
        return;
      }
    }
    
    this.getNewAffirmation();
  }

  getNewAffirmation() {
    const randomIndex = Math.floor(Math.random() * this.affirmations.length);
    this.todayAffirmation = this.affirmations[randomIndex];
    
    const today = new Date().toDateString();
    localStorage.setItem('dailyAffirmation', JSON.stringify({
      date: today,
      affirmation: this.todayAffirmation
    }));
  }
}