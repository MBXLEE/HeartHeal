import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ChatbotComponent } from './components/chatbot/chatbot';
import { AccountabilityComponent } from './components/accountability/accountability';
import { AffirmationsComponent } from './components/affirmations/affirmations';
import { GoalsComponent } from './components/goals/goals';
import { JournalComponent } from './components/journal/journal';
import { ProgressComponent } from './components/progress/progress';
import { LoginComponent } from './components/auth/login.component';
import { SignupComponent } from './components/auth/signup.component';
import { PaymentComponent } from './components/payment/payment.component'; // Uncomment this
import { authGuard } from '../auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'payment', component: PaymentComponent }, // Add this route
  { path: 'chatbot', component: ChatbotComponent, canActivate: [authGuard] },
  { path: 'accountability', component: AccountabilityComponent, canActivate: [authGuard] },
  { path: 'affirmations', component: AffirmationsComponent, canActivate: [authGuard] },
  { path: 'goals', component: GoalsComponent, canActivate: [authGuard] },
  { path: 'journal', component: JournalComponent, canActivate: [authGuard] },
  { path: 'progress', component: ProgressComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];