import { Component, inject, Input, ViewChild } from '@angular/core';
import { Gallery } from '../service/gallery';
import { GalleryCard } from '../gallery-card/gallery-card';
import { CommonModule } from '@angular/common';
import { GalleryModal } from '../gallery-modal/gallery-modal';

@Component({
  selector: 'app-advancegallery',
  imports: [GalleryCard, CommonModule, GalleryModal],
  templateUrl: './advancegallery.html',
  styleUrl: './advancegallery.scss'
})
export class Advancegallery {

  gallerySev = inject(Gallery);
  galleryList: any = [];
  @ViewChild('galleryModal') modal!: GalleryModal;

  ngOnInit() {
    this.gallerySev.getGallary().subscribe({
      next: (res: any) => {
        this.galleryList = res.gallary.map((item: any) => ({
          ...item,
          images: item.imgUrl.split(',').map((x: string) => x.trim())
        }));
      }
    });
  }

  onEditGallery(gallery: any) {

  }
  deleteGallery(gallery: any) {

  }
  openModal(m: any) {
    this.modal.open();
  }

}
