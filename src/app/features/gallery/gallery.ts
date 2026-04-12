import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  galleries:any;
  constructor(private api: Api,private sanitizer: DomSanitizer) {
  }
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
          this.galleries=res.gallary.map((img:any)=>{
             return {...img,
              imgUrl:img.imgUrl.split(',')
             }
          });
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
