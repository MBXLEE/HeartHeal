import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PlatformTracker {
  name: string;
  icon: string;
  lastChecked: Date | null;
  daysClean: number;
  isActive: boolean;
}

@Component({
  selector: 'app-accountability',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="accountability-container fade-in">
      <div class="card header-section">
        <h2>✅ Accountability Tracker</h2>
        <p>Track your progress staying away from their social media. You've got this! 💪</p>
      </div>

      <div class="card streak-card">
        <div class="streak-info">
          <div class="streak-number">{{totalDaysClean}}</div>
          <div class="streak-label">Total Days Clean 🔥</div>
        </div>
        <div class="streak-message">
          <p>{{getMotivationalMessage()}}</p>
        </div>
      </div>

      <div class="platforms-grid">
        <div class="card platform-card" *ngFor="let platform of platforms">
          <div class="platform-header">
            <span class="platform-icon">{{platform.icon}}</span>
            <h3>{{platform.name}}</h3>
            <label class="toggle-switch">
              <input type="checkbox" [(ngModel)]="platform.isActive" (change)="savePlatforms()">
              <span class="slider"></span>
            </label>
          </div>

          <div class="platform-stats" *ngIf="platform.isActive">
            <div class="days-clean">
              <span class="days-number">{{platform.daysClean}}</span>
              <span class="days-label">days clean</span>
            </div>

            <div class="last-checked" *ngIf="platform.lastChecked">
              <p>Last slip: {{formatDate(platform.lastChecked)}}</p>
            </div>

            <div class="action-buttons">
              <button class="btn-primary success-btn" (click)="addDay(platform)">
                ✅ Another Day Strong
              </button>
              <button class="btn-secondary slip-btn" (click)="recordSlip(platform)">
                😔 I Slipped Up
              </button>
            </div>
          </div>

          <div class="platform-inactive" *ngIf="!platform.isActive">
            <p>Enable tracking for {{platform.name}}</p>
          </div>
        </div>
      </div>

      <div class="card tips-section">
        <h3>💡 Staying Strong Tips</h3>
        <ul>
          <li>Delete their number or hide it so you can't easily access it</li>
          <li>Mute/unfollow them on all platforms (you don't have to block, just protect your peace)</li>
          <li>When you feel the urge, use the Reality Check Chat instead</li>
          <li>Replace stalking time with self-care activities</li>
          <li>Remember: Their life on social media isn't the full picture anyway</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .accountability-container {
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

    .streak-card {
      text-align: center;
      padding: 40px;
      background: linear-gradient(135deg, rgba(255, 105, 180, 0.1), rgba(216, 167, 216, 0.1));
      margin-bottom: 30px;
    }

    .streak-number {
      font-size: 80px;
      font-weight: 700;
      background: linear-gradient(135deg, #ff69b4, #d8a7d8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin-bottom: 10px;
    }

    .streak-label {
      font-size: 24px;
      color: var(--text-dark);
      font-weight: 600;
      margin-bottom: 20px;
    }

    .streak-message p {
      font-size: 18px;
      color: var(--text-light);
      font-style: italic;
    }

    .platforms-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .platform-card {
      transition: all 0.3s ease;
    }

    .platform-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid var(--light-pink);
    }

    .platform-icon {
      font-size: 32px;
    }

    .platform-header h3 {
      flex: 1;
      margin: 0;
      font-size: 20px;
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 26px;
    }

    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: 0.4s;
      border-radius: 26px;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }

    input:checked + .slider {
      background: linear-gradient(135deg, #ff69b4, #d8a7d8);
    }

    input:checked + .slider:before {
      transform: translateX(24px);
    }

    .platform-stats {
      text-align: center;
    }

    .days-clean {
      margin-bottom: 15px;
    }

    .days-number {
      font-size: 48px;
      font-weight: 700;
      color: var(--primary-pink);
      display: block;
    }

    .days-label {
      font-size: 16px;
      color: var(--text-light);
    }

    .last-checked {
      margin-bottom: 20px;
    }

    .last-checked p {
      font-size: 14px;
      color: var(--text-light);
    }

    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .success-btn {
      background: linear-gradient(135deg, #4ade80, #22c55e);
    }

    .slip-btn {
      color: var(--text-light);
      border-color: #ddd;
    }

    .platform-inactive {
      text-align: center;
      padding: 20px;
      color: var(--text-light);
    }

    .tips-section {
      background: #f0f9ff;
      border-left: 4px solid #3b82f6;
    }

    .tips-section h3 {
      margin-bottom: 15px;
      color: #3b82f6;
    }

    .tips-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .tips-section li {
      padding: 10px 0;
      padding-left: 25px;
      position: relative;
      color: var(--text-dark);
      line-height: 1.6;
    }

    .tips-section li:before {
      content: "→";
      position: absolute;
      left: 0;
      color: #3b82f6;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      .streak-number {
        font-size: 60px;
      }

      .streak-label {
        font-size: 20px;
      }

      .platforms-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AccountabilityComponent {
  platforms: PlatformTracker[] = [
    { name: 'Instagram', icon: '📷', lastChecked: null, daysClean: 0, isActive: true },
    { name: 'TikTok', icon: '🎵', lastChecked: null, daysClean: 0, isActive: true },
    { name: 'Facebook', icon: '👥', lastChecked: null, daysClean: 0, isActive: false },
    { name: 'Twitter/X', icon: '🐦', lastChecked: null, daysClean: 0, isActive: false },
    { name: 'Snapchat', icon: '👻', lastChecked: null, daysClean: 0, isActive: false },
    { name: 'WhatsApp', icon: '💬', lastChecked: null, daysClean: 0, isActive: false }
  ];

  totalDaysClean = 0;

  ngOnInit() {
    this.loadData();
    this.calculateTotalDays();
  }

  loadData() {
    const saved = localStorage.getItem('accountability');
    if (saved) {
      const data = JSON.parse(saved);
      this.platforms = data.platforms.map((p: any) => ({
        ...p,
        lastChecked: p.lastChecked ? new Date(p.lastChecked) : null
      }));
    }
  }

  savePlatforms() {
    localStorage.setItem('accountability', JSON.stringify({ platforms: this.platforms }));
  }

  addDay(platform: PlatformTracker) {
    platform.daysClean++;
    this.savePlatforms();
    this.calculateTotalDays();
  }

  recordSlip(platform: PlatformTracker) {
    if (confirm(`Are you sure you checked ${platform.name}? It's okay, we all slip up. Let's start fresh!`)) {
      platform.lastChecked = new Date();
      platform.daysClean = 0;
      this.savePlatforms();
      this.calculateTotalDays();
    }
  }

  calculateTotalDays() {
    const activePlatforms = this.platforms.filter(p => p.isActive);
    if (activePlatforms.length === 0) {
      this.totalDaysClean = 0;
      return;
    }
    this.totalDaysClean = Math.floor(
      activePlatforms.reduce((sum, p) => sum + p.daysClean, 0) / activePlatforms.length
    );
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  getMotivationalMessage(): string {
    if (this.totalDaysClean === 0) {
      return "Every journey starts with a single step. You've got this! 💪";
    } else if (this.totalDaysClean < 7) {
      return "Amazing start! The first week is always the hardest. Keep going! 🌟";
    } else if (this.totalDaysClean < 30) {
      return "Look at you go! You're building such strong habits. So proud! 🎉";
    } else if (this.totalDaysClean < 90) {
      return "WOW! You're absolutely crushing it! This is incredible progress! 🏆";
    } else {
      return "QUEEN ENERGY! You're officially thriving! Keep shining! 👑✨";
    }
  }
}