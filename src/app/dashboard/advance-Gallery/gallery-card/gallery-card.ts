import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery-card',
  imports: [DatePipe, CommonModule],
  templateUrl: './gallery-card.html',
  styleUrl: './gallery-card.scss'
})
export class GalleryCard  {
  @Input() gallery: any;
  @Output() editGallery = new EventEmitter();
  @Output() deleteGallery = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) {

  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
//  ngOnChanges() {
//   if (this.gallery?.imgUrl) {
//     this.gallery.images = this.gallery.imgUrl
//       .split(',')
//       .map((x: string) => x.trim());
//   }
// }
toggleLike(img:any)
{

}

}
