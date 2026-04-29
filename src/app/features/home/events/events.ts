import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Api } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
@Component({
  selector: 'app-events',
  imports: [CommonModule, RouterLink],
  templateUrl: './events.html',
  styleUrl: './events.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Events implements OnInit {
  events: any = [];
  @ViewChild('swiperRef') swiperRef!: ElementRef;
  constructor(private apiService: Api) {

  }
  ngOnInit(): void {
    this.getEvent();
    register();
  }
  ngAfterViewInit() {

    setTimeout(() => {

      Object.assign(this.swiperRef.nativeElement, {

        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,

        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },

        breakpoints: {
          576: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 }
        }

      });

      this.swiperRef.nativeElement.initialize();

    }, 300);
  }

  getEvent() {
    this.apiService.getEvent().subscribe({
      next: (res: any) => {
        this.events = res.data;
        console.log(this.events);

      }, error(error: any) {
        console.log(error);
      }
    })
  }

}
