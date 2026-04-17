import { Component, DestroyRef, inject } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-notice-dashboard',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './notice-dashboard.html',
  styleUrl: './notice-dashboard.scss'
})
export class NoticeDashboard {
  notices: any = [];
  selectedNotice: any = {};
  id: any;
  noticeForm!: FormGroup;
  editMode: boolean = false;
  destroyRef = inject(DestroyRef);
  constructor(private apiService: Api, private fb: FormBuilder) {
    this.noticeForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      date: ["", Validators.required],
      category: ["", Validators.required],
    })

  }
  ngOnInit(): void {
    this.apiService.getNotice();
    this.noticeList();

  }

  noticeList() {
    this.apiService.notice$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((res: any) => {
      this.notices = res;
    })

    // this.apiService.getNotice().subscribe({
    //   next: ((res) => {
    //     if (!!res.success) {
    //       this.notices = res.notice;
    //     }
    //   })
    // })
  }
  openAddEditModal(data: any) {
    if (!!data) {
      this.editMode = true;
      this.noticeForm.patchValue({
        title: data.title,
        date: this.formatDate(data.date),
        description: data.description,
        category: data.category
      })
      this.id = data._id;
    }
    else {
      this.editMode = false;
      this.noticeForm.reset();
    }

  }
  formatDate(date: any) {
    let d = new Date(date);
    console.log(d);
    let year = d.getFullYear();
    let month = String(d.getMonth() + 1).padStart(2, '0');
    let day = String(d.getDate()).padStart(2, '0');;
    console.log(`${day}/${month}/${year}`);
    return `${year}-${month}-${day}`;


  }
  submitForm() {
    if (this.editMode) {
      console.log(JSON.stringify(this.noticeForm.getRawValue()));
      this.apiService.updateNotice(this.id, this.noticeForm.getRawValue()).subscribe({
        next: (res: any) => {
          if (res.success) {
            alert(res.message);
            // this.getNotice();

          }
        }
      })
    }
    else {
      console.log(JSON.stringify(this.noticeForm.getRawValue()));
      this.apiService.addNotice(this.noticeForm.getRawValue()).subscribe({
        next: (res: any) => {
          if (res.success) {
            alert(res.message);
            // this.getNotice();

          }
        }
      })
    }
  }

  deleteNotice(id: any) {
    this.apiService.deleteNotice(id).subscribe({
      next: (res: any) => {
        if (res.success) {
          alert(res.message);
          // this.getNotice();

        }
      }
    })
  }
}
