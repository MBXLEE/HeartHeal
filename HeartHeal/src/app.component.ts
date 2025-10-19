import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './app/components/navigation/navigation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  template: `
    <div class="app-container">
      <app-navigation></app-navigation>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
    }

    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #ffeef8 0%, #fff0f5 50%, #ffe4f3 100%);
      width: 100%;
    }
    
    .main-content {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 15px;
      }
    }
  `]
})
export class AppComponent {
  title = 'HeartHeal';
}