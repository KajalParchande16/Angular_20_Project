import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  galleries: any;
  loading = false;
  allLoaded = false;
  galleryList: any[] = [];
  page = 1;
  limit = 4;
  constructor(private api: Api, private sanitizer: DomSanitizer) {
  }
  ngOnInit(): void {
    this.getAllGalleryData();
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
  // getAllGalleryData() {
  //   if (this.loading || this.allLoaded) return;
  //   this.loading = true;
  //   this.api.getGallery(this.page, this.limit).subscribe({
  //     next: (res: any) => {
  //       // console.log(res);
  //       this.galleryList = [...this.galleryList, ...res.data];
  //       // if(res.success)
  //       // {
  //       //   this.galleries=res.gallary.map((img:any)=>{
  //       //      return {...img,
  //       //       imgUrl:img.imgUrl.split(',')
  //       //      }
  //       //   });
  //       //   // res.gallary.map((obj:any)=>{
  //       //   //   obj['images']=obj.imgUrl.split(",");
  //       //   // });
  //       //   // this.galleries=res.gallary;
  //       //   // console.log(this.galleries);
  //       // }
  //       if (res.data.length < this.limit) {
  //         this.allLoaded = true;
  //       } else {
  //         this.page++;
  //       }

  //       this.loading = false;
  //     }
  //   })
  // }

  getAllGalleryData() {
    if (this.loading || this.allLoaded) return;

    this.loading = true;

    this.api.getGallery(this.page, this.limit).subscribe({
      next: (res: any) => {
        const newData = (res.data || []).map((item: any) => ({
          ...item,
          imgUrl: Array.isArray(item.imgUrl)
            ? item.imgUrl
            : item.imgUrl.split(',') // convert string to array
        }));

        this.galleryList = [...this.galleryList, ...newData];

        // if less than limit means no more records
        if (newData.length < this.limit) {
          this.allLoaded = true;
        } else {
          this.page++;
        }

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
