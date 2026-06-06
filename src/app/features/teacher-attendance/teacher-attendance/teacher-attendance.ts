import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-attendance',
  imports: [CommonModule],
  templateUrl: './teacher-attendance.html',
  styleUrl: './teacher-attendance.scss'
})
export class TeacherAttendance {
  totalTeachers = 50;
  presentCount = 40;
  absentCount = 6;
  leaveCount = 4;

  attendanceList = [
    {
      name: 'Rahul Patil',
      subject: 'Math',
      date: '10 May 2026',
      status: 'Present'
    },
    {
      name: 'Sneha Sharma',
      subject: 'English',
      date: '10 May 2026',
      status: 'Absent'
    },
    {
      name: 'Amit Kumar',
      subject: 'Science',
      date: '10 May 2026',
      status: 'Leave'
    }
  ];

  openAttendanceModal(){
    alert('Open mark attendance modal');
  }
}
