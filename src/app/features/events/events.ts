import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [CommonModule],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events  {
  events: any=[];
  selectedEvent:any={};
  constructor(private apiService: Api) { }
  
  ngOnInit()
  {
    window.scrollTo(0,0);
    this.getEvent();
  }

  getEvent() {
    this.apiService.getEvent().subscribe({
      next: (res: any) => {
        this.events=res.data;
        console.log(this.events);

      }, error(error: any) {
        console.log(error);
      }
    })
  }

  showEvent(event:any)
  {
    this.selectedEvent=event;
    console.log(this.selectedEvent);
  }
  

}
