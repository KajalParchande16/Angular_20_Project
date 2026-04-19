import { AfterViewInit, Component, ElementRef, OnChanges, SimpleChanges, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../../../services/api';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;
@Component({
  selector: 'app-gallery-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './gallery-modal.html',
  styleUrl: './gallery-modal.scss'
})
export class GalleryModal implements OnChanges,AfterViewInit {
  modalInstance: any;
  selectedGallery: any;
  id: any;
  isEdit: boolean = false;
  @ViewChild('title')value!:ElementRef;

  constructor(private api: Api, private fb: FormBuilder, private toaster: ToastrService) {
    this.selectedGallery = this.fb.group({
      title: ["", Validators.required],
      date: ["", Validators.required],
      imgUrl: ["", Validators.required],
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.value.nativeElement.focus()
  }
  ngAfterViewInit(): void {
    // this.value.nativeElement.focus();
    
  }
  open() {
    setTimeout(() => {
    this.value.nativeElement.focus();
      
    }, 2000);
    const element = document.getElementById('galleryModal');

    this.modalInstance = new bootstrap.Modal(element);

    this.modalInstance.show();
  }

  close() {
    this.modalInstance?.hide();
  }

  addGallery() {
    //   console.log(this.selectedGallery.value);
    //   const formData = new FormData();
    //   formData.append('title', this.selectedGallery.value.title);
    //   this.selectedFiles.forEach((file, index) => {
    //     formData.append('imgUrl', file); // backend handles array
    //   });
    //   formData.append('date', this.selectedGallery.value.date);

    //   // console.log(formData);
    //   for (let pair of formData.entries()) {
    //     console.log(pair[0], pair[1]);
    //   }
    //   const payload = {
    //     title: this.selectedGallery.value.title,
    //     date: this.selectedGallery.value.date,
    //     imgUrl: this.selectedFiles.map(f => f.name).join(',') // comma separated
    //   };
    //   console.log(payload);
    // this.api.addGallery(payload).subscribe((res: any) => {

    //   if (res.success) {
    //     this.selectedGallery.reset();
    //     this.getGallery();
    //   }k
    // })
    if (this.isEdit) {
      this.api.updateGallery(this.id, this.selectedGallery.value).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toaster.success(res.message);
            this.selectedGallery.reset();
            // this.getGallery();
          }
        },
        error: (err: any) => {
          this.toaster.error(err);
        }
      })
    }
    else {
      this.api.addGallery(this.selectedGallery.value).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toaster.success(res.message);
            this.selectedGallery.reset();
            // this.getGallery();
          }
        },
        error: (err: any) => {
          this.toaster.error(err);
        }
      })
    }
  }
}
