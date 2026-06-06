import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SidebarItem } from '../sidebar-item/sidebar-item';
import { DashboardStateService } from '../../services/dashboard/dashboard-state-service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, SidebarItem],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {

  state = inject(DashboardStateService);
}
