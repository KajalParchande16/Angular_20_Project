import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard {
  activeMenu = 'Home';

  //  activeMenu = 'Home';
  isMenuOpen = false;

  menus = ['Home', 'Articles', 'Category', 'Users', 'Comments', 'Settings'];

  dashboardStats = [
    { title: 'Total Articles', count: 124, icon: '📰' },
    { title: 'Categories', count: 8, icon: '📂' },
    { title: 'Users', count: 542, icon: '👤' },
    { title: 'Comments', count: 1296, icon: '💬' }
  ];

  recentArticles = [
    { title: 'Angular 19 Released', author: 'Admin', status: 'Published' },
    { title: 'Market Trends 2026', author: 'Editor', status: 'Draft' },
    { title: 'Sports Highlights', author: 'Admin', status: 'Published' }
  ];

  setMenu(menu: string) {
    this.activeMenu = menu;
    this.isMenuOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

