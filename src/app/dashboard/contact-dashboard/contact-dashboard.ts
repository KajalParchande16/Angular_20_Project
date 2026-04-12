import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-dashboard',
  imports: [CommonModule],
  templateUrl: './contact-dashboard.html',
  styleUrl: './contact-dashboard.scss'
})
export class ContactDashboard {
  contacts: any = [];
  selectedContact:any={};
  constructor(private api: Api) {

  }
  ngOnInit()
  {
    this.getContact();
  }

  getContact() {
    this.api.getContact().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.contacts = res.contact;
        }
      }
    })
  }

  viewContact(contact:any)
  {
this.selectedContact=contact;
  }
  deleteContact(id:any)
  {
    this.api.deleteContact(id).subscribe({
      next:(res:any)=>{
        if(res.success)
        {
          alert(res.message);
          this.getContact();
        }
      }
    })
  }

}
