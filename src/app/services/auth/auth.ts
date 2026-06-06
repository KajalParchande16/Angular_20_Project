import { Injectable, signal } from '@angular/core';
import { Api } from '../api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private cs: Api, private http: HttpClient, private router: Router) {
    this.initializeExistingUser();
  }
  currentUser = signal<any>(null);
  login(data: {}) {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }

  saveUserDetails(authResponse: any) {
    const token = authResponse.token;
    const userData = {
      name: authResponse.data?.name,
      role: authResponse.data?.role,
      email: authResponse.data?.email,
      profileImage: authResponse.data?.profileImage
    }
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));

    this.currentUser.set(userData);

  }

  private initializeExistingUser() {
    const existingUser = localStorage.getItem('user');
    if (!!existingUser) {
      try {
        this.currentUser.set(JSON.parse(existingUser));
      }
      catch (e) {
        this.clearUser();
      }
    }
  }
  clearUser() {
    localStorage.clear();
    this.currentUser.set(null);
  }

  logOut() {
    // localStorage.removeItem('token');
    this.clearUser();
    this.currentUser.set(null);
    this.router.navigate(['/login']);

  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }
}
