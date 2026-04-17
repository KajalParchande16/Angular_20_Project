import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Notice } from './notice/notice';
import { Events } from './events/events';
import { Achievements } from './achievements/achievements';
import { Gallery } from './gallery/gallery';
import { Api } from '../../services/api';

@Component({
  selector: 'app-home',
  imports: [Hero, Notice, Events, Achievements, Gallery],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private apiService: Api) {

  }
  ngOnInit(): void {
    // this.apiService.getContact().subscribe((res)=>{
    //   // console.log(res);
    // })
    this.apiService.getEvent().subscribe((res) => {
      // console.log(res);
    })
    this.apiService.getGallary().subscribe((res) => {
      // console.log(res);
    })
    // this.apiService.getNotice().subscribe((res)=>{
    //   // console.log(res);
    // })
    this.apiService.getNotice();
    this.apiService.getTeacher().subscribe((res) => {
      // console.log(res);
    })



  }
}
