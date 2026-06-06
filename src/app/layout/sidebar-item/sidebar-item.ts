import { Component, inject, input } from '@angular/core';
import { DashboardStateService } from '../../services/dashboard/dashboard-state-service';
import { NavItem } from '../../shared/model/dashboardModel';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-item.html',
  styleUrl: './sidebar-item.scss'
})
export class SidebarItem {
  item = input.required<NavItem>();
  state = inject(DashboardStateService);

  toggleDropdown(): void {
    this.item().expanded = !this.item().expanded;
  }
}
