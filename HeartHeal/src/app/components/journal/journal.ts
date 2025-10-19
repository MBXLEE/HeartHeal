import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface JournalEntry {
  id: number;
  date: Date;
  mood: string;
  content: string;
  gratitude?: string;
}

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="journal-container fade-in">
      <div class="card header-section">
        <h2>📔 What I Felt Today</h2>
        <p>Express your emotions freely. This is your safe space.</p>
      </div>

      <div class="card new-entry-section">
        <h3>{{editingEntry ? '✏️ Edit Entry' : '✍️ New Journal Entry'}}</h3>
        
        <div class="mood-selector">
          <p class="mood-label">How are you feeling?</p>
          <div class="mood-options">
            <button 
              *ngFor="let mood of moods"
              class="mood-btn"
              [class.selected]="newEntry.mood === mood.value"
              (click)="selectMood(mood.value)">
              <span class="mood-emoji">{{mood.emoji}}</span>
              <span class="mood-name">{{mood.name}}</span>
            </button>
          </div>
        </div>

        <div class="entry-form">
          <label>What happened today? How do you feel?</label>
          <textarea 
            [(ngModel)]="newEntry.content"
            placeholder="Pour your heart out... no judgment here 💕"
            class="input-field journal-textarea"
            rows="8"></textarea>

          <label>Something you're grateful for today (optional)</label>
          <input 
            type="text"
            [(ngModel)]="newEntry.gratitude"
            placeholder="Even small wins count! ✨"
            class="input-field">

          <div class="entry-actions">
            <button 
              class="btn-primary" 
              (click)="saveEntry()"
              [disabled]="!newEntry.mood || !newEntry.content.trim()">
              {{editingEntry ? 'Update Entry' : 'Save Entry'}} 💖
            </button>
            <button 
              *ngIf="editingEntry"
              class="btn-secondary" 
              (click)="cancelEdit()">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div class="entries-section">
        <div class="entries-header">
          <h3>📖 Your Journal Entries</h3>
          <span class="entry-count">{{entries.length}} entries</span>
        </div>

        <div class="entries-filter">
          <button 
            *ngFor="let mood of moods"
            class="filter-btn"
            [class.active]="filterMood === mood.value"
            (click)="setFilter(mood.value)">
            {{mood.emoji}} {{mood.name}}
          </button>
          <button 
            class="filter-btn"
            [class.active]="filterMood === 'all'"
            (click)="setFilter('all')">
            Show All
          </button>
        </div>

        <div class="entries-list" *ngIf="filteredEntries.length > 0">
          <div class="card entry-card" *ngFor="let entry of filteredEntries">
            <div class="entry-header">
              <div class="entry-mood">
                <span class="mood-emoji-large">{{getMoodEmoji(entry.mood)}}</span>
                <span class="mood-name-small">{{getMoodName(entry.mood)}}</span>
              </div>
              <div class="entry-date">{{formatDate(entry.date)}}</div>
            </div>

            <div class="entry-content">
              <p>{{entry.content}}</p>
            </div>

            <div class="entry-gratitude" *ngIf="entry.gratitude">
              <strong>✨ Grateful for:</strong> {{entry.gratitude}}
            </div>

            <div class="entry-actions-bottom">
              <button class="edit-btn" (click)="editEntry(entry)">✏️ Edit</button>
              <button class="delete-btn" (click)="deleteEntry(entry)">🗑️ Delete</button>
            </div>
          </div>
        </div>

        <div class="no-entries" *ngIf="filteredEntries.length === 0">
          <p>{{filterMood === 'all' ? 'No journal entries yet. Start writing!' : 'No entries with this mood.'}}</p>
        </div>
      </div>

      <div class="card prompts-section">
        <h3>💭 Journal Prompts</h3>
        <p class="prompts-subtitle">Not sure what to write? Try these:</p>
        <div class="prompts-list">
          <div class="prompt-item" *ngFor="let prompt of journalPrompts">
            <span class="prompt-icon">→</span>
            <p>{{prompt}}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .journal-container {
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

    .new-entry-section {
      margin-bottom: 30px;
    }

    .new-entry-section h3 {
      text-align: center;
      margin-bottom: 25px;
    }

    .mood-selector {
      margin-bottom: 25px;
    }

    .mood-label {
      font-weight: 600;
      margin-bottom: 15px;
      color: var(--text-dark);
    }

    .mood-options {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .mood-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 15px 20px;
      background: white;
      border: 2px solid var(--light-pink);
      border-radius: 15px;
      cursor: pointer;
      transition: all 0.3s ease;
      min-width: 100px;
    }

    .mood-btn:hover {
      transform: translateY(-3px);
      border-color: var(--primary-pink);
    }

    .mood-btn.selected {
      background: linear-gradient(135deg, var(--primary-pink), var(--soft-pink));
      border-color: var(--primary-pink);
    }

    .mood-btn.selected .mood-name {
      color: white;
    }

    .mood-emoji {
      font-size: 32px;
    }

    .mood-name {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-dark);
    }

    .entry-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .entry-form label {
      font-weight: 600;
      color: var(--text-dark);
    }

    .journal-textarea {
      min-height: 150px;
      font-family: inherit;
    }

    .entry-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    .entries-section {
      margin-bottom: 30px;
    }

    .entries-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      padding: 0 10px;
    }

    .entries-header h3 {
      margin: 0;
      font-size: 24px;
    }

    .entry-count {
      background: var(--light-pink);
      color: var(--primary-pink);
      padding: 6px 15px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
    }

    .entries-filter {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 20px;
      justify-content: center;
    }

    .filter-btn {
      padding: 8px 16px;
      background: white;
      border: 2px solid var(--light-pink);
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      color: var(--text-dark);
      transition: all 0.3s ease;
    }

    .filter-btn:hover {
      border-color: var(--primary-pink);
    }

    .filter-btn.active {
      background: var(--primary-pink);
      color: white;
      border-color: var(--primary-pink);
    }

    .entries-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .entry-card {
      border-left: 4px solid var(--primary-pink);
    }

    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 2px solid var(--pale-pink);
    }

    .entry-mood {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .mood-emoji-large {
      font-size: 32px;
    }

    .mood-name-small {
      font-weight: 600;
      color: var(--text-dark);
    }

    .entry-date {
      color: var(--text-light);
      font-size: 14px;
    }

    .entry-content p {
      margin: 0;
      line-height: 1.8;
      color: var(--text-dark);
      white-space: pre-wrap;
    }

    .entry-gratitude {
      margin-top: 15px;
      padding: 15px;
      background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 182, 193, 0.1));
      border-radius: 10px;
      font-size: 14px;
      line-height: 1.6;
    }

    .entry-actions-bottom {
      display: flex;
      gap: 10px;
      margin-top: 15px;
      padding-top: 15px;
      border-top: 2px solid var(--pale-pink);
    }

    .edit-btn, .delete-btn {
      background: none;
      border: none;
      padding: 8px 15px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      border-radius: 10px;
      transition: all 0.3s ease;
    }

    .edit-btn {
      color: var(--primary-pink);
    }

    .edit-btn:hover {
      background: var(--pale-pink);
    }

    .delete-btn {
      color: #999;
    }

    .delete-btn:hover {
      background: #fee;
      color: #e74c3c;
    }

    .no-entries {
      text-align: center;
      padding: 60px 20px;
      color: var(--text-light);
    }

    .prompts-section {
      background: linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(255, 105, 180, 0.1));
    }

    .prompts-section h3 {
      text-align: center;
      margin-bottom: 10px;
    }

    .prompts-subtitle {
      text-align: center;
      color: var(--text-light);
      margin-bottom: 20px;
    }

    .prompts-list {
      display: grid;
      gap: 12px;
    }

    .prompt-item {
      display: flex;
      gap: 15px;
      padding: 15px;
      background: white;
      border-radius: 10px;
      transition: all 0.3s ease;
    }

    .prompt-item:hover {
      transform: translateX(5px);
      box-shadow: 0 4px 15px rgba(255, 105, 180, 0.2);
    }

    .prompt-icon {
      color: var(--primary-pink);
      font-weight: bold;
      font-size: 18px;
    }

    .prompt-item p {
      margin: 0;
      line-height: 1.6;
      color: var(--text-dark);
    }

    @media (max-width: 768px) {
      .mood-options {
        gap: 8px;
      }

      .mood-btn {
        min-width: 80px;
        padding: 12px 15px;
      }

      .mood-emoji {
        font-size: 24px;
      }

      .entries-header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }
    }
  `]
})
export class JournalComponent {
  entries: JournalEntry[] = [];
  newEntry = { mood: '', content: '', gratitude: '' };
  editingEntry: JournalEntry | null = null;
  filterMood = 'all';
  nextId = 1;

  moods = [
    { value: 'sad', name: 'Sad', emoji: '😢' },
    { value: 'angry', name: 'Angry', emoji: '😤' },
    { value: 'hopeful', name: 'Hopeful', emoji: '🌈' },
    { value: 'peaceful', name: 'Peaceful', emoji: '😌' },
    { value: 'confused', name: 'Confused', emoji: '😕' },
    { value: 'strong', name: 'Strong', emoji: '💪' }
  ];

  journalPrompts = [
    "What did I learn about myself today?",
    "What am I grateful for right now?",
    "What would I tell my past self a month ago?",
    "How have I grown since the breakup?",
    "What made me smile today, even for a moment?",
    "What do I need to forgive myself for?",
    "What boundaries do I need to set for myself?",
    "What does my ideal future look like?",
    "What qualities do I want in my next relationship?",
    "How did I choose myself today?"
  ];

  get filteredEntries(): JournalEntry[] {
    if (this.filterMood === 'all') {
      return this.entries;
    }
    return this.entries.filter(e => e.mood === this.filterMood);
  }

  ngOnInit() {
    this.loadEntries();
  }

  loadEntries() {
    const saved = localStorage.getItem('journal');
    if (saved) {
      this.entries = JSON.parse(saved).map((e: any) => ({
        ...e,
        date: new Date(e.date)
      }));
      this.nextId = Math.max(...this.entries.map(e => e.id), 0) + 1;
    }
  }

  saveEntries() {
    localStorage.setItem('journal', JSON.stringify(this.entries));
  }

  selectMood(mood: string) {
    this.newEntry.mood = mood;
  }

  saveEntry() {
    if (!this.newEntry.mood || !this.newEntry.content.trim()) return;

    if (this.editingEntry) {
      this.editingEntry.mood = this.newEntry.mood;
      this.editingEntry.content = this.newEntry.content.trim();
      this.editingEntry.gratitude = this.newEntry.gratitude.trim() || undefined;
      this.editingEntry = null;
    } else {
      const entry: JournalEntry = {
        id: this.nextId++,
        date: new Date(),
        mood: this.newEntry.mood,
        content: this.newEntry.content.trim(),
        gratitude: this.newEntry.gratitude.trim() || undefined
      };
      this.entries.unshift(entry);
    }

    this.saveEntries();
    this.resetForm();
  }

  editEntry(entry: JournalEntry) {
    this.editingEntry = entry;
    this.newEntry = {
      mood: entry.mood,
      content: entry.content,
      gratitude: entry.gratitude || ''
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteEntry(entry: JournalEntry) {
    if (confirm('Are you sure you want to delete this journal entry?')) {
      this.entries = this.entries.filter(e => e.id !== entry.id);
      this.saveEntries();
    }
  }

  cancelEdit() {
    this.editingEntry = null;
    this.resetForm();
  }

  resetForm() {
    this.newEntry = { mood: '', content: '', gratitude: '' };
  }

  setFilter(mood: string) {
    this.filterMood = mood;
  }

  getMoodEmoji(mood: string): string {
    return this.moods.find(m => m.value === mood)?.emoji || '😊';
  }

  getMoodName(mood: string): string {
    return this.moods.find(m => m.value === mood)?.name || '';
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}