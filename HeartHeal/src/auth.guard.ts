import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './app/services/auth.service'; // Fixed import path

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  if (!authService.hasAccess()) {
    router.navigate(['/payment']);
    return false;
  }

  return true;
};