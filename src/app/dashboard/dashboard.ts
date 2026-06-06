import { Component } from '@angular/core';
import { ContactDashboard } from './contact-dashboard/contact-dashboard';
import { EventsDashboard } from './events-dashboard/events-dashboard';
import { GalleryDashboard } from './gallery-dashboard/gallery-dashboard';
import { NoticeDashboard } from './notice-dashboard/notice-dashboard';
import { TeachersDashboard } from './teachers-dashboard/teachers-dashboard';
import { FormsModule } from '@angular/forms';
import { Advancegallery } from './advance-Gallery/advancegallery/advancegallery';
import { TeacherAttendance } from '../features/teacher-attendance/teacher-attendance/teacher-attendance';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [TeachersDashboard, FormsModule, ContactDashboard, EventsDashboard, GalleryDashboard, NoticeDashboard, Advancegallery, TeacherAttendance, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  selectedMenu: string = "contact";

  // 🔥 Dashboard summary cards
  cards = [
    {
      title: 'Total Students',
      value: 1200,
      class: 'students'
    },
    {
      title: 'Total Teachers',
      value: 80,
      class: 'teachers'
    },
    {
      title: 'Attendance %',
      value: '92%',
      class: 'attendance'
    },
    {
      title: 'Fees Collected',
      value: '₹5,00,000',
      class: 'fees'
    }
  ];

  // 📊 Chart placeholders
  charts = [
    {
      title: 'Monthly Attendance'
    },
    {
      title: 'Revenue Report'
    }
  ];

  // 📢 Recent activity
  activities = [
    'Student "Rahul" added',
    'Attendance marked for Class 10',
    'Fees payment received',
    'New teacher joined'
  ];
}
