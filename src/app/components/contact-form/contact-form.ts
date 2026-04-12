import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class ContactForm {
  contactForm!:FormGroup;

constructor(private fb:FormBuilder,private api:Api)
{
this.contactForm=this.fb.group({
name:['',Validators.required],
email:['',[Validators.required,Validators.email]],
phone:['',Validators.required],
subject:['',Validators.required],
message:['',Validators.required],
})
}

submitForm()
{
  console.log(this.contactForm.value);
  this.api.createContact(this.contactForm.value).subscribe({
    next:(res:any)=>{
      if(res.success)
      {
        alert("Contact created successfully");
        this.contactForm.reset();
      }
    }
  })
}
}
