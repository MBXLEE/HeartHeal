import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  email: string;
  name: string;
  hasAccess: boolean;
  createdAt: Date;
}

interface StoredUser extends User {
  password: string;
}

interface AuthResult {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(private router: Router) {
    this.loadUser();
  }

  // Check if user is logged in
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Check if user has paid (has access)
  hasAccess(): boolean {
    return this.currentUser?.hasAccess || false;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Sign up new user
  signup(email: string, password: string, name: string): AuthResult {
    // Check if user already exists
    const existingUsers = this.getAllUsers();
    if (existingUsers[email]) {
      return { success: false, message: 'Email already registered' };
    }

    // Validate email
    if (!this.isValidEmail(email)) {
      return { success: false, message: 'Please enter a valid email address' };
    }

    // Validate password
    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }

    // Create new user (without access until payment)
    const newUser: User = {
      email,
      name,
      hasAccess: false,
      createdAt: new Date()
    };

    // Save user
    existingUsers[email] = {
      ...newUser,
      password: btoa(password) // Simple encoding (in production, use proper hashing)
    };
    localStorage.setItem('heartheal_users', JSON.stringify(existingUsers));

    // Auto login after signup
    this.currentUser = newUser;
    localStorage.setItem('heartheal_current_user', JSON.stringify(newUser));

    return { success: true, message: 'Account created successfully!' };
  }

  // Login existing user
  login(email: string, password: string): AuthResult {
    const existingUsers = this.getAllUsers();
    const user = existingUsers[email];

    if (!user) {
      return { success: false, message: 'Email not found. Please sign up first.' };
    }

    // Check password
    if (user.password !== btoa(password)) {
      return { success: false, message: 'Incorrect password' };
    }

    // Login successful
    this.currentUser = {
      email: user.email,
      name: user.name,
      hasAccess: user.hasAccess,
      createdAt: new Date(user.createdAt)
    };
    localStorage.setItem('heartheal_current_user', JSON.stringify(this.currentUser));

    return { success: true, message: 'Login successful!' };
  }

  // Process payment (simulate R50 payment)
  processPayment(): AuthResult {
    if (!this.currentUser) {
      return { success: false, message: 'Please login first' };
    }

    if (this.currentUser.hasAccess) {
      return { success: false, message: 'You already have access!' };
    }

    // Update user access
    this.currentUser.hasAccess = true;
    localStorage.setItem('heartheal_current_user', JSON.stringify(this.currentUser));

    // Update in users database
    const allUsers = this.getAllUsers();
    if (allUsers[this.currentUser.email]) {
      allUsers[this.currentUser.email].hasAccess = true;
      localStorage.setItem('heartheal_users', JSON.stringify(allUsers));
    }

    return { success: true, message: 'Payment successful! Welcome to HeartHeal! 💖' };
  }

  // Logout
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('heartheal_current_user');
    this.router.navigate(['/login']);
  }

  // Private helper methods
  private loadUser(): void {
    const saved = localStorage.getItem('heartheal_current_user');
    if (saved) {
      this.currentUser = JSON.parse(saved);
    }
  }

  private getAllUsers(): Record<string, StoredUser> {
    const saved = localStorage.getItem('heartheal_users');
    return saved ? JSON.parse(saved) : {};
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}