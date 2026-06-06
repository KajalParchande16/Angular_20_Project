import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-teachers',
  imports: [CommonModule, FormsModule],
  templateUrl: './teachers.html',
  styleUrl: './teachers.scss'
})
export class Teachers implements OnInit {
  isLoading = true;
  teachers: any = [];
  currentView = signal<'grid' | 'table'>('table');
  isFilterModalOpen = signal<boolean>(false);
  isFilterSidebarOpen = signal<boolean>(false);
  constructor(private api: Api, private sanitizer: DomSanitizer) {

  }
  ngOnInit(): void {
    this.getTeachers();
    this.getUsers();
  }
  // setView(viewType: 'grid' | 'table'): void {
  //   this.currentView.set(viewType);
  // }
  setView(viewType: 'grid' | 'table'): void {
    this.currentView.set(viewType);
  }

  toggleFilterModal(isOpen: boolean): void {
    this.isFilterModalOpen.set(isOpen);
  }
  // 👈 Simplified toggle logic
  toggleFilters(): void {
    this.isFilterSidebarOpen.update(val => !val);
  }
  getTeachers() {
    this.api.getTeacher().subscribe({
      next: (res: any) => {
        // console.log(res.data);
        this.teachers = res.data;
        // console.log(this.teachers);
        this.isLoading = false;

      }
    })
  }
  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  getUsers() {
    this.api.getUsers().then(user => {
      console.log(user);
    }).catch(err => {
      console.log(err);
    })
  }
}
