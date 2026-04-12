import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-teachers-dashboard',
  imports: [ReactiveFormsModule],
  templateUrl: './teachers-dashboard.html',
  styleUrl: './teachers-dashboard.scss'
})
export class TeachersDashboard {
  teachers: any = [];
  editMode: boolean = false;
  teacherForm!: FormGroup;
  id: any;
  constructor(private api: Api, private fb: FormBuilder) {
    this.teacherForm = this.fb.group({
      name: ["", Validators.required],
      subject: ["", Validators.required],
      designation: ["", Validators.required],
      img: ["", Validators.required],
      bio: ["", Validators.required],
    })

  }
  ngOnInit(): void {
    this.getTeachers()
  }

  getTeachers() {
    this.api.getTeacher().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.teachers = res.data;

      }
    })
  }

  openAddEditModal(data: any) {
    if (!!data) {
      this.editMode = true;
      this.teacherForm.patchValue(data)
      this.id = data._id;
    }
    else {
      this.editMode = false;
      this.teacherForm.reset();
    }

  }
  submitForm() {
    if (this.editMode) {
      console.log(JSON.stringify(this.teacherForm.getRawValue()));
      this.api.updateTeacher(this.id, this.teacherForm.getRawValue()).subscribe({
        next: (res: any) => {
          if (res.success) {
            alert(res.message);
            this.getTeachers();

          }
        }
      })
    }
    else {
      console.log(JSON.stringify(this.teacherForm.getRawValue()));
      this.api.addTeacher(this.teacherForm.getRawValue()).subscribe({
        next: (res: any) => {
          if (res.success) {
            alert(res.message);
            this.getTeachers();

          }
        }
      })
    }
  }

  deleteTeacher(id: any) {
    this.api.deleteTeacher(id).subscribe({
      next: (res: any) => {
        if (res.success) {
          alert(res.message);
          this.getTeachers();

        }
      }
    })
  }

}
