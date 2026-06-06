import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-profile',
  imports: [],
  templateUrl: './teacher-profile.html',
  styleUrl: './teacher-profile.scss'
})
export class TeacherProfile {
activeTab: string = 'overview';
  teacherId: string | null = '';

  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    // Get the ID from the URL (e.g., /profile/TCH-2026-021)
    this.teacherId = this.route.snapshot.paramMap.get('id');
    
    // Here you will eventually call your API: 
    // this.teacherService.getTeacherById(this.teacherId).subscribe(...)
  }
  setTab(tabName: string) {
    this.activeTab = tabName;
  }
}
