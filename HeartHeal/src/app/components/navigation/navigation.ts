import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <h1>💖 HeartHeal</h1>
        </div>
        
        <button class="mobile-toggle" (click)="toggleMenu()" [class.active]="isMenuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul class="nav-links" [class.active]="isMenuOpen">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">Home</a></li>
          <li><a routerLink="/chatbot" routerLinkActive="active" (click)="closeMenu()">💬 Chat</a></li>
          <li><a routerLink="/accountability" routerLinkActive="active" (click)="closeMenu()">✅ Tracker</a></li>
          <li><a routerLink="/affirmations" routerLinkActive="active" (click)="closeMenu()">✨ Affirmations</a></li>
          <li><a routerLink="/goals" routerLinkActive="active" (click)="closeMenu()">🎯 Goals</a></li>
          <li><a routerLink="/journal" routerLinkActive="active" (click)="closeMenu()">📔 Journal</a></li>
          <li><a routerLink="/progress" routerLinkActive="active" (click)="closeMenu()">📈 Progress</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #ff69b4, #ff8fd4);
      box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-brand h1 {
      color: white;
      font-size: 24px;
      margin: 0;
      font-weight: 700;
    }

    .nav-links {
      display: flex;
      list-style: none;
      gap: 10px;
      margin: 0;
      padding: 0;
    }

    .nav-links li a {
      color: white;
      text-decoration: none;
      padding: 10px 18px;
      border-radius: 20px;
      font-weight: 600;
      transition: all 0.3s ease;
      display: block;
      font-size: 15px;
    }

    .nav-links li a:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    .nav-links li a.active {
      background: white;
      color: #ff69b4;
    }

    .mobile-toggle {
      display: none;
      flex-direction: column;
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
    }

    .mobile-toggle span {
      width: 25px;
      height: 3px;
      background: white;
      margin: 3px 0;
      border-radius: 3px;
      transition: all 0.3s ease;
    }

    .mobile-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(8px, 8px);
    }

    .mobile-toggle.active span:nth-child(2) {
      opacity: 0;
    }

    .mobile-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -7px);
    }

    @media (max-width: 768px) {
      .mobile-toggle {
        display: flex;
      }

      .nav-links {
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #ff69b4, #ff8fd4);
        flex-direction: column;
        padding: 20px;
        gap: 5px;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 8px 15px rgba(255, 105, 180, 0.3);
      }

      .nav-links.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .nav-links li a {
        padding: 12px 20px;
      }
    }
  `]
})
export class NavigationComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}