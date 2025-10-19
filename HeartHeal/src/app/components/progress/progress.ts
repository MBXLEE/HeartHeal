import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Milestone {
  days: number;
  title: string;
  icon: string;
  reward: string;
  achieved: boolean;
}

interface Reward {
  id: number;
  title: string;
  description: string;
  earned: boolean;
  earnedDate?: Date;
}

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="progress-container fade-in">
      <div class="card header-section">
        <h2>📈 Your Healing Journey</h2>
        <p>Celebrate every step forward. You're doing amazing! 💖</p>
      </div>

      <div class="card overview-section">
        <div class="overview-stats">
          <div class="stat-box">
            <div class="stat-icon">🔥</div>
            <div class="stat-number">{{totalDaysClean}}</div>
            <div class="stat-label">Days No Contact</div>
          </div>
          <div class="stat-box">
            <div class="stat-icon">✅</div>
            <div class="stat-number">{{completedGoals}}</div>
            <div class="stat-label">Goals Achieved</div>
          </div>
          <div class="stat-box">
            <div class="stat-icon">📔</div>
            <div class="stat-number">{{journalEntries}}</div>
            <div class="stat-label">Journal Entries</div>
          </div>
          <div class="stat-box">
            <div class="stat-icon">🏆</div>
            <div class="stat-number">{{earnedRewards}}</div>
            <div class="stat-label">Rewards Earned</div>
          </div>
        </div>
      </div>

      <div class="card milestones-section">
        <h3>🎯 Healing Milestones</h3>
        <p class="section-subtitle">Track your journey to full recovery</p>
        
        <div class="milestones-track">
          <div class="milestone-item" 
               *ngFor="let milestone of milestones"
               [class.achieved]="milestone.achieved"
               [class.next]="!milestone.achieved && isNextMilestone(milestone)">
            <div class="milestone-icon">{{milestone.icon}}</div>
            <div class="milestone-content">
              <h4>{{milestone.title}}</h4>
              <p class="milestone-days">{{milestone.days}} days no contact</p>
              <p class="milestone-reward">🎁 {{milestone.reward}}</p>
            </div>
            <div class="milestone-status">
              <span *ngIf="milestone.achieved" class="achieved-badge">✓ Done!</span>
              <span *ngIf="!milestone.achieved && isNextMilestone(milestone)" class="next-badge">Next Goal</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card rewards-section">
        <h3>🎁 Reward Yourself</h3>
        <p class="section-subtitle">Create rewards for staying strong</p>

        <div class="add-reward-form">
          <input 
            type="text"
            [(ngModel)]="newRewardTitle"
            placeholder="e.g., Spa day, New book, Movie night"
            class="input-field">
          <input 
            type="text"
            [(ngModel)]="newRewardDescription"
            placeholder="When will you earn this?"
            class="input-field">
          <button class="btn-primary" (click)="addReward()" [disabled]="!newRewardTitle || !newRewardDescription">
            Add Reward
          </button>
        </div>

        <div class="rewards-grid">
          <div class="reward-card" 
               *ngFor="let reward of rewards"
               [class.earned]="reward.earned">
            <div class="reward-header">
              <h4>{{reward.title}}</h4>
              <button class="reward-toggle" (click)="toggleReward(reward)">
                {{reward.earned ? '✓' : '○'}}
              </button>
            </div>
            <p class="reward-description">{{reward.description}}</p>
            <p class="reward-earned" *ngIf="reward.earned && reward.earnedDate">
              Earned on {{formatDate(reward.earnedDate)}}
            </p>
            <button class="delete-reward-btn" (click)="deleteReward(reward)">Delete</button>
          </div>
        </div>

        <div class="no-rewards" *ngIf="rewards.length === 0">
          <p>No rewards yet. Add some to celebrate your progress!</p>
        </div>
      </div>

      <div class="card suggestions-section">
        <h3>💡 Reward Ideas</h3>
        <div class="suggestions-grid">
          <div class="suggestion-card" *ngFor="let suggestion of rewardSuggestions">
            <span class="suggestion-icon">{{suggestion.icon}}</span>
            <p>{{suggestion.text}}</p>
          </div>
        </div>
      </div>

      <div class="card motivation-section">
        <h3>💪 Keep Going!</h3>
        <div class="motivation-message">
          <p>{{getMotivationMessage()}}</p>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar">
            <div class="progress-fill" [style.width.%]="getOverallProgress()"></div>
          </div>
          <p class="progress-text">{{getOverallProgress()}}% towards full recovery</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .progress-container {
      max-width: 1000px;
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

    .overview-section {
      padding: 40px;
      background: linear-gradient(135deg, rgba(255, 105, 180, 0.1), rgba(216, 167, 216, 0.1));
      margin-bottom: 30px;
    }

    .overview-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 25px;
    }

    .stat-box {
      text-align: center;
    }

    .stat-icon {
      font-size: 40px;
      margin-bottom: 10px;
    }

    .stat-number {
      font-size: 36px;
      font-weight: 700;
      color: var(--primary-pink);
      margin-bottom: 8px;
    }

    .stat-label {
      font-size: 14px;
      color: var(--text-light);
      font-weight: 600;
    }

    .milestones-section {
      margin-bottom: 30px;
    }

    .milestones-section h3 {
      text-align: center;
      margin-bottom: 10px;
    }

    .section-subtitle {
      text-align: center;
      color: var(--text-light);
      margin-bottom: 30px;
    }

    .milestones-track {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .milestone-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 25px;
      background: white;
      border-radius: 15px;
      border: 3px solid var(--pale-pink);
      transition: all 0.3s ease;
      position: relative;
    }

    .milestone-item.achieved {
      border-color: #4ade80;
      background: linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(34, 197, 94, 0.05));
    }

    .milestone-item.next {
      border-color: var(--primary-pink);
      box-shadow: 0 8px 25px rgba(255, 105, 180, 0.3);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }

    .milestone-icon {
      font-size: 48px;
      min-width: 60px;
      text-align: center;
    }

    .milestone-content {
      flex: 1;
    }

    .milestone-content h4 {
      margin: 0 0 8px 0;
      color: var(--text-dark);
      font-size: 18px;
    }

    .milestone-days {
      margin: 0 0 5px 0;
      color: var(--text-light);
      font-size: 14px;
    }

    .milestone-reward {
      margin: 0;
      color: var(--primary-pink);
      font-size: 14px;
      font-weight: 600;
    }

    .milestone-status {
      min-width: 80px;
      text-align: right;
    }

    .achieved-badge {
      background: #4ade80;
      color: white;
      padding: 8px 15px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
    }

    .next-badge {
      background: var(--primary-pink);
      color: white;
      padding: 8px 15px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
    }

    .rewards-section {
      margin-bottom: 30px;
    }

    .rewards-section h3 {
      text-align: center;
      margin-bottom: 10px;
    }

    .add-reward-form {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }

    .add-reward-form input {
      flex: 1;
      min-width: 200px;
    }

    .rewards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .reward-card {
      padding: 25px;
      background: white;
      border-radius: 15px;
      border: 3px solid var(--light-pink);
      transition: all 0.3s ease;
    }

    .reward-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(255, 105, 180, 0.2);
    }

    .reward-card.earned {
      border-color: #4ade80;
      background: linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(34, 197, 94, 0.05));
    }

    .reward-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .reward-header h4 {
      margin: 0;
      color: var(--text-dark);
      font-size: 18px;
    }

    .reward-toggle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid var(--primary-pink);
      background: white;
      font-size: 18px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .reward-toggle:hover {
      background: var(--pale-pink);
    }

    .reward-card.earned .reward-toggle {
      background: #4ade80;
      border-color: #4ade80;
      color: white;
    }

    .reward-description {
      margin: 0 0 10px 0;
      color: var(--text-light);
      line-height: 1.6;
    }

    .reward-earned {
      margin: 0 0 10px 0;
      font-size: 12px;
      color: #4ade80;
      font-weight: 600;
    }

    .delete-reward-btn {
      background: none;
      border: none;
      color: #999;
      cursor: pointer;
      font-size: 12px;
      padding: 5px 0;
      transition: color 0.3s ease;
    }

    .delete-reward-btn:hover {
      color: #e74c3c;
    }

    .no-rewards {
      text-align: center;
      padding: 60px 20px;
      color: var(--text-light);
    }

    .suggestions-section {
      margin-bottom: 30px;
      background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 182, 193, 0.1));
    }

    .suggestions-section h3 {
      text-align: center;
      margin-bottom: 25px;
    }

    .suggestions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }

    .suggestion-card {
      padding: 20px;
      background: white;
      border-radius: 12px;
      text-align: center;
    }

    .suggestion-icon {
      font-size: 32px;
      display: block;
      margin-bottom: 10px;
    }

    .suggestion-card p {
      margin: 0;
      color: var(--text-dark);
      font-size: 14px;
      line-height: 1.5;
    }

    .motivation-section {
      text-align: center;
      padding: 40px;
      background: linear-gradient(135deg, rgba(216, 167, 216, 0.2), rgba(255, 105, 180, 0.2));
    }

    .motivation-section h3 {
      margin-bottom: 20px;
    }

    .motivation-message {
      margin-bottom: 30px;
    }

    .motivation-message p {
      font-size: 20px;
      line-height: 1.6;
      color: var(--text-dark);
      font-style: italic;
    }

    .progress-bar-container {
      max-width: 600px;
      margin: 0 auto;
    }

    .progress-text {
      margin-top: 15px;
      color: var(--text-light);
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .overview-stats {
        grid-template-columns: repeat(2, 1fr);
      }

      .milestone-item {
        flex-direction: column;
        text-align: center;
      }

      .milestone-status {
        text-align: center;
        margin-top: 10px;
      }

      .add-reward-form {
        flex-direction: column;
      }

      .add-reward-form input,
      .add-reward-form button {
        width: 100%;
      }

      .rewards-grid {
        grid-template-columns: 1fr;
      }

      .suggestions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProgressComponent {
  totalDaysClean = 0;
  completedGoals = 0;
  journalEntries = 0;
  earnedRewards = 0;

  newRewardTitle = '';
  newRewardDescription = '';
  rewards: Reward[] = [];
  nextRewardId = 1;

  milestones: Milestone[] = [
    { days: 1, title: 'First Day Strong', icon: '🌱', reward: 'Treat yourself to your favorite snack', achieved: false },
    { days: 3, title: '3 Days Clean', icon: '💪', reward: 'Buy yourself flowers', achieved: false },
    { days: 7, title: 'One Week Warrior', icon: '⭐', reward: 'Movie night with friends', achieved: false },
    { days: 14, title: 'Two Weeks Thriving', icon: '🌟', reward: 'Spa day or self-care treat', achieved: false },
    { days: 21, title: '21 Days - New Habit!', icon: '🎯', reward: 'New outfit or accessory', achieved: false },
    { days: 30, title: 'One Month Queen', icon: '👑', reward: 'Weekend getaway or mini trip', achieved: false },
    { days: 60, title: 'Two Months Amazing', icon: '🦋', reward: 'Something you\'ve been wanting', achieved: false },
    { days: 90, title: '90 Days of Growth', icon: '🏆', reward: 'Major celebration - you earned it!', achieved: false }
  ];

  rewardSuggestions = [
    { icon: '💅', text: 'Manicure/Pedicure' },
    { icon: '📚', text: 'Buy a new book' },
    { icon: '☕', text: 'Fancy coffee date with yourself' },
    { icon: '🎬', text: 'Cinema trip' },
    { icon: '🛍️', text: 'Shopping spree' },
    { icon: '🍰', text: 'Dessert from favorite bakery' },
    { icon: '🎨', text: 'Art supplies or craft kit' },
    { icon: '🎮', text: 'New video game' },
    { icon: '🧘‍♀️', text: 'Yoga or fitness class' },
    { icon: '🎵', text: 'Concert tickets' },
    { icon: '🌸', text: 'Bouquet of flowers' },
    { icon: '✈️', text: 'Plan a trip' }
  ];

  ngOnInit() {
    this.loadAllData();
  }

  loadAllData() {
    // Load accountability data
    const accountability = JSON.parse(localStorage.getItem('accountability') || '{}');
    if (accountability.platforms) {
      const activePlatforms = accountability.platforms.filter((p: any) => p.isActive);
      if (activePlatforms.length > 0) {
        this.totalDaysClean = Math.floor(
          activePlatforms.reduce((sum: number, p: any) => sum + p.daysClean, 0) / activePlatforms.length
        );
      }
    }

    // Load goals data
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    this.completedGoals = goals.filter((g: any) => g.completed).length;

    // Load journal data
    const journal = JSON.parse(localStorage.getItem('journal') || '[]');
    this.journalEntries = journal.length;

    // Load rewards data
    const savedRewards = localStorage.getItem('rewards');
    if (savedRewards) {
      this.rewards = JSON.parse(savedRewards).map((r: any) => ({
        ...r,
        earnedDate: r.earnedDate ? new Date(r.earnedDate) : undefined
      }));
      this.nextRewardId = Math.max(...this.rewards.map(r => r.id), 0) + 1;
    }

    this.earnedRewards = this.rewards.filter(r => r.earned).length;

    // Update milestones
    this.updateMilestones();
  }

  updateMilestones() {
    this.milestones.forEach(milestone => {
      milestone.achieved = this.totalDaysClean >= milestone.days;
    });
  }

  isNextMilestone(milestone: Milestone): boolean {
    const nextMilestone = this.milestones.find(m => !m.achieved);
    return milestone === nextMilestone;
  }

  addReward() {
    if (!this.newRewardTitle.trim() || !this.newRewardDescription.trim()) return;

    const reward: Reward = {
      id: this.nextRewardId++,
      title: this.newRewardTitle.trim(),
      description: this.newRewardDescription.trim(),
      earned: false
    };

    this.rewards.push(reward);
    this.saveRewards();

    this.newRewardTitle = '';
    this.newRewardDescription = '';
  }

  toggleReward(reward: Reward) {
    reward.earned = !reward.earned;
    if (reward.earned) {
      reward.earnedDate = new Date();
      this.earnedRewards++;
    } else {
      reward.earnedDate = undefined;
      this.earnedRewards--;
    }
    this.saveRewards();
  }

  deleteReward(reward: Reward) {
    if (confirm('Delete this reward?')) {
      this.rewards = this.rewards.filter(r => r.id !== reward.id);
      if (reward.earned) {
        this.earnedRewards--;
      }
      this.saveRewards();
    }
  }

  saveRewards() {
    localStorage.setItem('rewards', JSON.stringify(this.rewards));
  }

  getOverallProgress(): number {
    const maxDays = 90; // 90 days for full recovery milestone
    return Math.min(Math.round((this.totalDaysClean / maxDays) * 100), 100);
  }

  getMotivationMessage(): string {
    const progress = this.getOverallProgress();
    
    if (progress === 0) {
      return "Your journey starts now. Every single day counts, and you're brave for beginning! 💖";
    } else if (progress < 25) {
      return "You're taking your first steps and doing amazing! The hardest part is starting, and you did it! 🌱";
    } else if (progress < 50) {
      return "Look at you go! You're building incredible strength and resilience. Keep shining! ✨";
    } else if (progress < 75) {
      return "WOW! You're more than halfway there! Your growth is inspiring and beautiful! 🦋";
    } else if (progress < 100) {
      return "You're SO close to your 90-day milestone! You're absolutely crushing this journey! 👑";
    } else {
      return "QUEEN! You've reached 90 days! You're thriving, glowing, and unstoppable! 🏆💖✨";
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}