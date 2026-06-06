import { Component, HostListener, inject, output } from '@angular/core';
import { DashboardStateService } from '../../services/dashboard/dashboard-state-service';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  state = inject(DashboardStateService);
  onMenuToggle = output<void>();
  auth = inject(Auth);
  loggedInUser = this.auth.currentUser;
  // Tracks whether the profile menu card overlay is visible or hidden
  isProfileOpen = false;

  toggleProfileMenu(event: Event): void {
    event.stopPropagation(); // Prevents instant closing via event bubbling bubbles loop
    this.isProfileOpen = !this.isProfileOpen;
  }

  // Clear global listener to close dropdown on clicking anywhere else on the document frame page
  @HostListener('document:click')
  closeDropdownFromOutside(): void {
    this.isProfileOpen = false;
  }

  handleSignOutAction(): void {
    // console.log('Clearing user cookies, auth tokens, and navigating to Login screen...');
    this.isProfileOpen = false;
    this.auth.logOut();
  }
}
