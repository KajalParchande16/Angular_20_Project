import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
export interface SubjectModel {
  subjectName: string;
  subjectCode: string;
  subjectType: 'Theory' | 'Practical' | 'Viva';
  description: string;
}
@Component({
  selector: 'app-subject',
  imports: [FormsModule, CommonModule],
  templateUrl: './subject.html',
  styleUrl: './subject.scss'
})
export class Subject {
  allSubjects: SubjectModel[] = [
    {
      subjectName: 'Hindi',
      subjectCode: 'HIN101',
      subjectType: 'Theory',
      description: 'Hindi Language & Literature basic module'
    },
    {
      subjectName: 'Physics Practical',
      subjectCode: 'PHY202',
      subjectType: 'Practical',
      description: 'Laboratory experimental physics orientation'
    }
  ];
  filteredSubjects: SubjectModel[] = [];

  // Filter state properties bound via [(ngModel)] in the template
  filters = {
    searchTerm: '',
    subjectType: ''
  };

  ngOnInit(): void {
    // Initialize the display array with master data on load
    this.filteredSubjects = [...this.allSubjects];
  }
  applyFilters(): void {
    const search = this.filters.searchTerm.toLowerCase().trim();
    const type = this.filters.subjectType;

    this.filteredSubjects = this.allSubjects.filter(subject => {
      const matchesSearch = !search ||
        subject.subjectName.toLowerCase().includes(search) ||
        subject.subjectCode.toLowerCase().includes(search);

      const matchesType = !type || subject.subjectType === type;

      return matchesSearch && matchesType;
    });
  }

  /**
   * Action triggered from the premium manage dropdown
   */
  onUpdate(): void {
    // console.log('Initialize Update handling process for:', subject);
    // TODO: Open edit dialog sheet or route to edit sub-view
  }

  /**
   * Action triggered from the premium delete item row button
   */
  onDelete(): void {
    // console.log('Initialize Delete verification protocol for:', subject);
    // TODO: Trigger confirmation snackbar/dialog and delegate to data service
  }
}
