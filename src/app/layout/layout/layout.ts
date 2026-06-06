import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';
import { DashboardStateService } from '../../services/dashboard/dashboard-state-service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Sidebar, Navbar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  state = inject(DashboardStateService);
  isMobileMenuOpen = false;

  ngOnInit(): void {
    this.checkScreenConstraints(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResizeEvent(event: any): void {
    this.checkScreenConstraints(event.target.innerWidth);
  }

  private checkScreenConstraints(currentWidth: number): void {
    if (currentWidth <= 992) {
      // On mobile viewports, keep sidebar closed by default
      if (!this.isMobileMenuOpen) {
        this.state.setSidebarState(true);
      }
    } else {
      // Reset layout states cleanly when returning to desktop monitors
      this.state.setSidebarState(false);
      this.isMobileMenuOpen = false;
    }
  }

  triggerMenuToggleAction(): void {
    if (window.innerWidth <= 992) {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      // Sync service state with mobile drawer visibility
      this.state.setSidebarState(!this.isMobileMenuOpen);
    } else {
      this.state.toggleSidebar();
    }
  }

  closeMobileDrawer(): void {
    this.isMobileMenuOpen = false;
    this.state.setSidebarState(true); // Force-collapse the menu structural logic
  }
}
