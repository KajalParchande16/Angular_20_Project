import { Component, OnInit } from '@angular/core';
import { Api } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  imports: [CommonModule,RouterLink],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events implements OnInit {
  events: any=[];
  constructor(private apiService:Api){

  }
  ngOnInit(): void {
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

}
