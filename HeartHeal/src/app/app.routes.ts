import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ChatbotComponent } from './components/chatbot/chatbot';
import { AccountabilityComponent } from './components/accountability/accountability';
import { AffirmationsComponent } from './components/affirmations/affirmations';
import { GoalsComponent } from './components/goals/goals';
import { JournalComponent } from './components/journal/journal';
import { ProgressComponent } from './components/progress/progress';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'accountability', component: AccountabilityComponent },
  { path: 'affirmations', component: AffirmationsComponent },
  { path: 'goals', component: GoalsComponent },
  { path: 'journal', component: JournalComponent },
  { path: 'progress', component: ProgressComponent },
  { path: '**', redirectTo: '' }
];