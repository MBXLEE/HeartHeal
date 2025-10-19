import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Goal {
  id: number;
  title: string;
  category: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="goals-container fade-in">
      <div class="card header-section">
        <h2>🎯 Recovery Goals</h2>
        <p>Set goals to keep moving forward and not lose yourself in the sadness</p>
      </div>

      <div class="card stats-section">
        <div class="stat">
          <span class="stat-number">{{completedGoals}}</span>
          <span class="stat-label">Completed</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{activeGoals}}</span>
          <span class="stat-label">In Progress</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{completionRate}}%</span>
          <span class="stat-label">Success Rate</span>
        </div>
      </div>

      <div class="card add-goal-section">
        <h3>Add New Goal</h3>
        <div class="add-goal-form">
          <select [(ngModel)]="newGoalCategory" class="input-field">
            <option value="">Select Category</option>
            <option *ngFor="let cat of categories" [value]="cat">{{cat}}</option>
          </select>
          <input 
            type="text" 
            [(ngModel)]="newGoalTitle"
            (keyup.enter)="addGoal()"
            placeholder="What do you want to achieve?"
            class="input-field">
          <button class="btn-primary" (click)="addGoal()" [disabled]="!newGoalTitle || !newGoalCategory">
            Add Goal ✨
          </button>
        </div>
      </div>

      <div class="goals-by-category">
        <div *ngFor="let category of categories" class="category-section">
          <div class="category-header" *ngIf="getGoalsByCategory(category).length > 0">
            <h3>{{getCategoryIcon(category)}} {{category}}</h3>
            <span class="category-count">{{getGoalsByCategory(category).length}}</span>
          </div>

          <div class="goals-list">
            <div class="card goal-item" 
                 *ngFor="let goal of getGoalsByCategory(category)"
                 [class.completed]="goal.completed">
              <div class="goal-content">
                <input 
                  type="checkbox" 
                  [checked]="goal.completed"
                  (change)="toggleGoal(goal)"
                  class="goal-checkbox">
                <div class="goal-text">
                  <p class="goal-title">{{goal.title}}</p>
                  <span class="goal-date">
                    {{goal.completed ? 'Completed ' + formatDate(goal.completedAt!) : 'Added ' + formatDate(goal.createdAt)}}
                  </span>
                </div>
              </div>
              <button class="delete-btn" (click)="deleteGoal(goal)">🗑️</button>
            </div>
          </div>
        </div>
      </div>

      <div class="card suggestions-section">
        <h3>💡 Goal Ideas to Get You Started</h3>
        <div class="suggestions-grid">
          <div class="suggestion-item" *ngFor="let suggestion of goalSuggestions" (click)="addSuggestion(suggestion)">
            <span class="suggestion-icon">{{suggestion.icon}}</span>
            <p>{{suggestion.text}}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .goals-container {
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

    .stats-section {
      display: flex;
      justify-content: space-around;
      padding: 30px;
      background: linear-gradient(135deg, rgba(255, 105, 180, 0.1), rgba(216, 167, 216, 0.1));
      margin-bottom: 25px;
    }

    .stat {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 40px;
      font-weight: 700;
      color: var(--primary-pink);
      margin-bottom: 8px;
    }

    .stat-label {
      font-size: 14px;
      color: var(--text-light);
      font-weight: 600;
    }

    .add-goal-section {
      margin-bottom: 30px;
    }

    .add-goal-section h3 {
      margin-bottom: 20px;
      text-align: center;
    }

    .add-goal-form {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .add-goal-form select,
    .add-goal-form input {
      flex: 1;
      min-width: 200px;
    }

    .add-goal-form button {
      padding: 12px 25px;
    }

    .category-section {
      margin-bottom: 35px;
    }

    .category-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      padding: 0 10px;
    }

    .category-header h3 {
      margin: 0;
      font-size: 22px;
    }

    .category-count {
      background: var(--light-pink);
      color: var(--primary-pink);
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
    }

    .goals-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .goal-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      transition: all 0.3s ease;
      border-left: 4px solid var(--primary-pink);
    }

    .goal-item:hover {
      transform: translateX(5px);
    }

    .goal-item.completed {
      opacity: 0.7;
      border-left-color: #4ade80;
    }

    .goal-item.completed .goal-title {
      text-decoration: line-through;
      color: var(--text-light);
    }

    .goal-content {
      display: flex;
      align-items: center;
      gap: 15px;
      flex: 1;
    }

    .goal-checkbox {
      width: 24px;
      height: 24px;
      cursor: pointer;
      accent-color: var(--primary-pink);
    }

    .goal-text {
      flex: 1;
    }

    .goal-title {
      margin: 0 0 5px 0;
      font-size: 16px;
      color: var(--text-dark);
      font-weight: 500;
    }

    .goal-date {
      font-size: 12px;
      color: var(--text-light);
    }

    .delete-btn {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.3s ease;
      padding: 5px 10px;
    }

    .delete-btn:hover {
      opacity: 1;
    }

    .suggestions-section {
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

    .suggestion-item {
      padding: 20px;
      background: white;
      border-radius: 15px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .suggestion-item:hover {
      transform: translateY(-5px);
      border-color: var(--primary-pink);
      box-shadow: 0 8px 20px rgba(255, 105, 180, 0.2);
    }

    .suggestion-icon {
      font-size: 30px;
      display: block;
      margin-bottom: 10px;
    }

    .suggestion-item p {
      margin: 0;
      color: var(--text-dark);
      font-size: 14px;
      line-height: 1.4;
    }

    @media (max-width: 768px) {
      .stats-section {
        flex-direction: column;
        gap: 20px;
      }

      .add-goal-form {
        flex-direction: column;
      }

      .add-goal-form select,
      .add-goal-form input,
      .add-goal-form button {
        width: 100%;
      }

      .suggestions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class GoalsComponent {
  goals: Goal[] = [];
  newGoalTitle = '';
  newGoalCategory = '';
  nextId = 1;

  categories = [
    'Self-Care',
    'Career & Education',
    'Fitness & Health',
    'Social Life',
    'Personal Growth',
    'Hobbies & Interests'
  ];

  goalSuggestions = [
    { icon: '🧘‍♀️', text: 'Start a morning meditation practice', category: 'Self-Care' },
    { icon: '📚', text: 'Read 2 books this month', category: 'Personal Growth' },
    { icon: '💪', text: 'Exercise 3 times a week', category: 'Fitness & Health' },
    { icon: '👯‍♀️', text: 'Plan a girls night out', category: 'Social Life' },
    { icon: '🎨', text: 'Learn a new creative skill', category: 'Hobbies & Interests' },
    { icon: '💼', text: 'Update my resume/portfolio', category: 'Career & Education' },
    { icon: '🌱', text: 'Start journaling daily', category: 'Personal Growth' },
    { icon: '🍳', text: 'Cook a new recipe each week', category: 'Self-Care' },
    { icon: '🎯', text: 'Set career development goals', category: 'Career & Education' },
    { icon: '😴', text: 'Establish a healthy sleep routine', category: 'Fitness & Health' },
    { icon: '🎵', text: 'Learn to play an instrument', category: 'Hobbies & Interests' },
    { icon: '✈️', text: 'Plan a solo trip', category: 'Personal Growth' }
  ];

  get completedGoals(): number {
    return this.goals.filter(g => g.completed).length;
  }

  get activeGoals(): number {
    return this.goals.filter(g => !g.completed).length;
  }

  get completionRate(): number {
    if (this.goals.length === 0) return 0;
    return Math.round((this.completedGoals / this.goals.length) * 100);
  }

  ngOnInit() {
    this.loadGoals();
  }

  loadGoals() {
    const saved = localStorage.getItem('goals');
    if (saved) {
      const data = JSON.parse(saved);
      this.goals = data.map((g: any) => ({
        ...g,
        createdAt: new Date(g.createdAt),
        completedAt: g.completedAt ? new Date(g.completedAt) : undefined
      }));
      this.nextId = Math.max(...this.goals.map(g => g.id), 0) + 1;
    }
  }

  saveGoals() {
    localStorage.setItem('goals', JSON.stringify(this.goals));
  }

  addGoal() {
    if (!this.newGoalTitle.trim() || !this.newGoalCategory) return;

    const goal: Goal = {
      id: this.nextId++,
      title: this.newGoalTitle.trim(),
      category: this.newGoalCategory,
      completed: false,
      createdAt: new Date()
    };

    this.goals.unshift(goal);
    this.saveGoals();
    
    this.newGoalTitle = '';
    this.newGoalCategory = '';
  }

  addSuggestion(suggestion: any) {
    this.newGoalTitle = suggestion.text;
    this.newGoalCategory = suggestion.category;
  }

  toggleGoal(goal: Goal) {
    goal.completed = !goal.completed;
    if (goal.completed) {
      goal.completedAt = new Date();
    } else {
      goal.completedAt = undefined;
    }
    this.saveGoals();
  }

  deleteGoal(goal: Goal) {
    if (confirm('Are you sure you want to delete this goal?')) {
      this.goals = this.goals.filter(g => g.id !== goal.id);
      this.saveGoals();
    }
  }

  getGoalsByCategory(category: string): Goal[] {
    return this.goals.filter(g => g.category === category);
  }

  getCategoryIcon(category: string): string {
    const icons: any = {
      'Self-Care': '💆‍♀️',
      'Career & Education': '💼',
      'Fitness & Health': '💪',
      'Social Life': '👥',
      'Personal Growth': '🌱',
      'Hobbies & Interests': '🎨'
    };
    return icons[category] || '⭐';
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}