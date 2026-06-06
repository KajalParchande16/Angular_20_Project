import { computed, inject, Injectable, signal } from '@angular/core';
import { NavItem } from '../../shared/model/dashboardModel';
import { Auth } from '../auth/auth';

@Injectable({
  providedIn: 'root'
})
export class DashboardStateService {
  auth = inject(Auth);
  constructor() { }
  // Global layout tracking states
  isSidebarCollapsed = signal<boolean>(false);
  currentTheme = signal<'light' | 'dark'>('light');

  // Enterprise School System Navigation configurations
  menuItems = signal<NavItem[]>([
    // Everyone sees Dashboard
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/layout/dashboard'
    },

    // Admin & Teacher
    {
      label: 'Teacher',
      icon: 'co_present',
      roles: ['Admin', 'Teacher'],
      route: '/layout/teacher'
    },

    // Admin & Teacher
    {
      label: 'Student',
      icon: 'people',
      roles: ['Admin', 'Teacher'],
      route: '/layout/student'
    },

    // Admin only
    {
      label: 'Parent',
      icon: 'family_restroom',
      roles: ['Admin'],
      route: '/layout/parent'
    },

    // Admin & Teacher
    {
      label: 'Academics',
      icon: 'school',
      roles: ['Admin', 'Teacher'],
      children: [
        {
          label: 'Classes & Sections',
          icon: 'layers',
          route: '/layout/academics/classes'
        },
        {
          label: 'Subjects Mapping',
          icon: 'book',
          route: '/layout/academics/subjects'
        }
      ]
    },

    // Admin only
    {
      label: 'Admission Desk',
      icon: 'assignment_ind',
      roles: ['Admin'],
      children: [
        {
          label: 'Enquiries',
          icon: 'chat_bubble_outline',
          route: '/layout/admissions/enquiries'
        },
        {
          label: 'Applications',
          icon: 'description',
          route: '/layout/admissions/applications'
        },
        {
          label: 'Shortlisted',
          icon: 'how_to_reg',
          route: '/layout/admissions/shortlist'
        },
        {
          label: 'Fee Allocation',
          icon: 'account_balance_wallet',
          route: '/layout/admissions/fee-allocation'
        }
      ]
    },

    // Admin & Teacher
    {
      label: 'Students Portal',
      icon: 'people',
      roles: ['Admin', 'Teacher'],
      children: [
        {
          label: 'Student Directory',
          icon: 'contacts',
          route: '/layout/students/list'
        },
        {
          label: 'Attendance Records',
          icon: 'how_to_reg',
          route: '/layout/students/attendance'
        }
      ]
    },

    // Admin only
    {
      label: 'Staff Directory',
      icon: 'badge',
      roles: ['Admin'],
      children: [
        {
          label: 'Teachers Roster',
          icon: 'co_present',
          route: '/layout/staff/teachers'
        },
        {
          label: 'Non-Teaching Staff',
          icon: 'engineering',
          route: '/layout/staff/support'
        },
        {
          label: 'Leave Applications',
          icon: 'event_busy',
          route: '/layout/staff/leaves'
        },
        {
          label: 'Payroll & Salaries',
          icon: 'receipt_long',
          route: '/layout/staff/payroll'
        }
      ]
    },

    // Admin only
    {
      label: 'Fee Management',
      icon: 'payments',
      roles: ['Admin'],
      route: '/layout/finance/fees'
    },

    // Admin only
    {
      label: 'System Settings',
      icon: 'settings',
      roles: ['Admin'],
      route: '/layout/settings'
    }
  ]);



  toggleSidebar(): void {
    this.isSidebarCollapsed.update(state => !state);
  }

  setSidebarState(collapsed: boolean): void {
    this.isSidebarCollapsed.set(collapsed);
  }

  toggleTheme(): void {
    this.currentTheme.update(theme => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      return newTheme;
    });
  }

  // 2. THE MODERN REACTIVE FILTER ENGINE
  // This automatically recalculates every single time a page refreshes or a user changes!
  // showMenuItems = computed(() => {
  //   // Read the current user's role from your updated AuthService signal
  //   const userRole = this.auth.currentUser()?.role; 

  //   if (!userRole) return []; // Return empty menu if no user logged in

  //   // Filter the master list based on permissions
  //   return this.menuItems().filter(item => {
  //     // If item doesn't have restricted roles, show it to everyone
  //     if (!item.roles) return true;

  //     // Otherwise, check if the user's role is permitted
  //     return item.roles.includes(userRole);
  //   });
  // });

  showMenuItems = computed(() => {
    const userRole = this.auth.currentUser()?.role;

    if (!userRole) return [];

    return this.menuItems()
      .filter(item => {
        // Top level filter
        if (!item.roles) return true;
        return item.roles.includes(userRole);
      })
      .map(item => {
        // If item has children — filter them too
        if (item.children && item.children.length > 0) {
          return {
            ...item,
            children: item.children.filter(child => {
              if (!child.roles) return true;
              return child.roles.includes(userRole);
            })
          };
        }
        return item;
      });
  });
}
