import { Component, inject, signal } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-events-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './events-dashboard.html',
  styleUrl: './events-dashboard.scss'
})
export class EventsDashboard {
  apiService = inject(Api);
  // events: any = [];
  events=signal<any[]>([]);
  eventForm!: FormGroup;
  editMode: boolean = false;
  id: any;
  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: ["", Validators.required],
      date: ["", Validators.required],
      location: ["", Validators.required],
      shortDescription: ["", Validators.required],
      description: ["", Validators.required],
    })
  }

  ngOnInit() {
    this.getEvent();
  }

  getEvent() {
    this.apiService.getEvent().subscribe({
      next: (res: any) => {
        this.events.set(res.data);
        console.log(this.events);

      }, error(error: any) {
        console.log(error);
      }
    })
  }

  addEditEvent(data: any) {
    if (!!data) {
      this.editMode = true;
      // this.formatDate(data.date);
      this.eventForm.patchValue({
        title: data.title,
        description: data.description,
        shortDescription: data.shortDescription,
        date: this.formatDate(data.date),
        location: data.location,
      });
      this.id = data._id;
      console.log(this.eventForm.value);
      console.log(this.eventForm.controls['date']);
    }
    else {
      this.editMode = false;
      this.eventForm.reset();
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
      console.log(JSON.stringify(this.eventForm.getRawValue()));
      this.apiService.updateEvent(this.id, this.eventForm.getRawValue()).subscribe({
        next: (res: any) => {
          if (res.success) {
            alert(res.message);
            this.getEvent();

          }
        }
      })
    }
    else {
      console.log(JSON.stringify(this.eventForm.getRawValue()));
      this.apiService.addEvent(this.eventForm.getRawValue()).subscribe({
        next: (res: any) => {
          if (res.success) {
            alert(res.message);
            this.getEvent();

          }
        }
      })
    }
  }
  deleteEvent(id:any)
  {
     this.apiService.deleteEvent(id).subscribe({
        next: (res: any) => {
          if (res.success) {
            alert(res.message);
            this.getEvent();

          }
        }
      })
  }
}
