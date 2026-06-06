import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../../../services/api';
export interface AdmissionRecord {
  _id: string,
  status: string,
  studentDetails: {
    studentName: string;
    dob: string;
    gender: string;
    age: number;
    bloodGroup: string;
    religion: string;
    castCategory: string;
    nationality: string;
    motherTongue: string;
    aadhaar: string;
  };
  admissionDetails: {
    admissionClass: string;
    academicYear: string;
    preSchool: string;
    reasonLeaving: string;
  };
  father: {
    name: string;
    qualification: string;
    occupation: string;
    office: string;
    contact: string;
    email: string;
    aadhaar: string;
  };
  mother: {
    name: string;
    qualification: string;
    occupation: string;
    office: string;
    contact: string;
    email: string;
    aadhaar: string;
  };
  guardian: {
    name: string;
    relationship: string;
    contact: string;
    address: string;
  };
  addressDetails: {
    presentAddress: string;
    permanentAddress: string;
    emergencyContact: string;
    alternateContact: string;
  };
  declaration: {
    agree: boolean;
    declarationDate: string;
  };
}
@Component({
  selector: 'app-admission-list',
  imports: [FormsModule, DatePipe, CommonModule],
  templateUrl: './admission-list.html',
  styleUrl: './admission-list.scss'
})
export class AdmissionList {
  rawAdmissionData: AdmissionRecord[] = [];
  filteredData: AdmissionRecord[] = [];
  api = inject(Api)

  // Track selected elements globally by standard primary unique key values
  selectedRecords = new Set<string>();

  // Component local UI binding parameters for operational filtering rules
  filters = {
    searchTerm: '',
    admissionClass: '',
    category: '',
    status: '',
    startDate: '',
    endDate: ''
  };

  // State management parameters defining current active tracking orientation rules
  sortKey: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  ngOnInit(): void {
    this.loadAdmissions();
    // this.applyFilters();
  }

  // Pre-seed matching records mimicking database payload arrays safely
  loadAdmissions(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.api.getAdmission().subscribe({
      next: (data) => {
        this.rawAdmissionData = data;
        this.applyFilters(); // ✅ called AFTER data arrives
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load admissions');
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }


  // Pure data pipeline evaluation processing multi-faceted input filters synchronously
  filterByStatus(status: string): void {
    this.filters.status = status;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredData = this.rawAdmissionData.filter((record: any) => {
      const searchStr = this.filters.searchTerm.toLowerCase().trim();
      const nameMatch = record.studentDetails.studentName.toLowerCase().includes(searchStr);
      const fatherMatch = record.father.name.toLowerCase().includes(searchStr);
      const passesSearch = !searchStr || nameMatch || fatherMatch;

      const passesClass = !this.filters.admissionClass ||
        record.admissionDetails.admissionClass === this.filters.admissionClass;

      const passesCategory = !this.filters.category ||
        record.studentDetails.castCategory === this.filters.category;

      // ✅ Status filter
      const passesStatus = !this.filters.status ||
        record.status === this.filters.status;

      let passesDate = true;
      const targetDate = new Date(record.declaration.declarationDate);
      if (this.filters.startDate) {
        if (targetDate < new Date(this.filters.startDate)) passesDate = false;
      }
      if (this.filters.endDate) {
        if (targetDate > new Date(this.filters.endDate)) passesDate = false;
      }

      return passesSearch && passesClass && passesCategory && passesStatus && passesDate;
    });

    if (this.sortKey) this.executeSort();
  }

  approveAdmission(id: string): void {
    // this.api.updateAdmissionStatus(id, 'Approved').subscribe({
    //   next: () => this.loadAdmissions(),
    //   error: (err) => this.errorMessage.set(err.message)
    // });
  }

  // // ✅ Reject admission via API
  rejectAdmission(id: string): void {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;

    // this.api.updateAdmissionStatus(id, 'Rejected', reason).subscribe({
    //   next: () => this.loadAdmissions(),
    //   error: (err) => this.errorMessage.set(err.message)
    // });
  }
  // Sort tracking setup triggering directional sorting flag flips or updates
  deleteRecord(id: string): void {
    if (confirm('Are you sure you want to delete this admission?')) {
      // this.api.deleteAdmission(id).subscribe({
      //   next: () => {
      //     this.selectedRecords.delete(id);
      //     this.loadAdmissions();
      //   },
      //   error: (err) => this.errorMessage.set(err.message)
      // });
    }
  }

  // ✅ Bulk delete — still local for now
  bulkDelete(): void {
    if (confirm(`Delete ${this.selectedRecords.size} selected records?`)) {
      // const deletePromises = Array.from(this.selectedRecords).map(id =>
      //   this.api.deleteAdmission(id).subscribe()
      // );
      this.selectedRecords.clear();
      setTimeout(() => this.loadAdmissions(), 500);
    }
  }

  sort(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
    this.executeSort();
  }

  private executeSort(): void {
    this.filteredData.sort((a, b) => {
      let valA = this.getNestedValue(a, this.sortKey);
      let valB = this.getNestedValue(b, this.sortKey);
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  private getNestedValue(obj: any, key: string): any {
    if (key === 'studentName') return obj.studentDetails.studentName;
    if (key === 'admissionClass') return obj.admissionDetails.admissionClass;
    if (key === 'declarationDate') return obj.declaration.declarationDate;
    return obj[key];
  }

  getSortIcon(key: string): string {
    if (this.sortKey !== key) return '↕️';
    return this.sortDirection === 'asc' ? '🔼' : '🔽';
  }

  toggleRowSelection(id: string): void {
    if (this.selectedRecords.has(id)) {
      this.selectedRecords.delete(id);
    } else {
      this.selectedRecords.add(id);
    }
  }

  isAllSelected(): boolean {
    return this.filteredData.length > 0 &&
      this.filteredData.every((r: any) => this.selectedRecords.has(r._id));
  }

  toggleAllPageRows(event: any): void {
    if (event.target.checked) {
      this.filteredData.forEach((r: any) => this.selectedRecords.add(r._id));
    } else {
      this.filteredData.forEach((r: any) => this.selectedRecords.delete(r._id));
    }
  }

  editRecord(record: AdmissionRecord): void {
    console.log('Edit:', record);
  }
  updateStatus(data: any, state: string) {

  }

}
