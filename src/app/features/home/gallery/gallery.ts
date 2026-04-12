import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { Api } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { SwiperOptions, SwiperModule} from 'swiper/types';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    encapsulation: ViewEncapsulation.None,
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery implements OnInit {

  galleries:any;
  constructor(private api: Api,private sanitizer: DomSanitizer) {
  }

  config: SwiperOptions = {
    slidesPerView: 1,
    navigation: true,
    pagination: { clickable: true },
    loop: true
  };
  ngOnInit(): void {
    this.getAllGalleryData();
  }

  sanitizeUrl(url:string)
  {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
  getAllGalleryData() {
    this.api.getGallary().subscribe({
      next: (res:any) => {
        // console.log(res);
        if(res.success)
        {
          this.galleries=res.gallary;
          // this.galleries=res.gallary.map((img:any)=>{
          //    return {...img,
          //     imgUrl:img.imgUrl.split(',')
          //    }
          // });
          // res.gallary.map((obj:any)=>{
          //   obj['images']=obj.imgUrl.split(",");
          // });
          // this.galleries=res.gallary;
          // console.log(this.galleries);
        }
      }
    })
  }

}
