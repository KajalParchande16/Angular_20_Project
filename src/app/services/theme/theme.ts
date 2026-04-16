import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Theme {

  constructor() { }

  key = 'theme';
  initialTheme() {
    const saved = localStorage.getItem(this.key) || 'light';
    this.applyTheme(saved);
  }
  applyTheme(saved: string) {
    document.body.classList.remove(
      'light-theme',
      'dark-theme'
    );

    document.body.classList.add(`${saved}-theme`);
  }
  toggleTheme() {
    const current=localStorage.getItem(this.key) || 'light';
    const next=current==='light'?'dark':'light';

    this.applyTheme(next);
    localStorage.setItem(this.key,next);
  }
  getCurrentTheme() {
    return localStorage.getItem(this.key) || 'light';
  }
}
