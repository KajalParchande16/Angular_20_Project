import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gallery-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gallery-dashboard.html',
  styleUrl: './gallery-dashboard.scss',
  encapsulation: ViewEncapsulation.None,
})
export class GalleryDashboard implements OnInit {
  galleries: any = [];
  selectedFiles: File[] = [];
  previewImages: string[] = [];
  name = '';
  date = '';
  selectedGallery: any;
  id: any;
  isEdit: boolean = false;
  constructor(private api: Api, public sanitizer: DomSanitizer, private fb: FormBuilder, private toaster: ToastrService) {
    this.selectedGallery = this.fb.group({
      title: ["", Validators.required],
      date: ["", Validators.required],
      imgUrl: ["", Validators.required],
    })
  }
  ngOnInit(): void {
    this.getGallery();
  }

  getGallery() {
    this.api.getGallary().subscribe({
      next: (res: any) => {
        console.log(res);
        this.galleries = res.gallary.map((data: any) => {

          return {
            ...data,
            images: data.imgUrl.split(',')
          }
        })
        console.log(this.galleries);
      }
    })
  }

  onSelectImgs(e: Event) {
    console.log(e.target);
    const input = e.target as HTMLInputElement;
    //  console.log(input.files);//it will give fileList not a actual array
    //  so need to convert it into array by using Array.from()

    if (!input.files) return;
    Array.from(input.files).forEach((file) => {

      this.selectedFiles.push(file);
      this.previewImages.push(URL.createObjectURL(file));
      console.log(this.selectedFiles);

      const csvImages = this.selectedFiles.map(f => f.name).join(',');

      this.selectedGallery.patchValue({
        imgUrl: csvImages
      });
    })

  }
  removeFile(index: number) {
    console.log(index);
    URL.revokeObjectURL(this.previewImages[index]);
    this.selectedFiles.splice(index, 1);
    this.previewImages.splice(index, 1);

    const csvImages = this.selectedFiles
      .map(file => file.name)
      .join(',');

    this.selectedGallery.patchValue({
      imgUrl: csvImages
    });

    // optional: handle empty state
    if (this.selectedFiles.length === 0) {
      this.selectedGallery.get('imgUrl')?.reset();
    }

  }
  addGallery() {
    console.log(this.selectedGallery.value);
    const formData = new FormData();
    formData.append('title', this.selectedGallery.value.title);
    this.selectedFiles.forEach((file, index) => {
      formData.append('imgUrl', file); // backend handles array
    });
    formData.append('date', this.selectedGallery.value.date);

    // console.log(formData);
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    const payload = {
      title: this.selectedGallery.value.title,
      date: this.selectedGallery.value.date,
      imgUrl: this.selectedFiles.map(f => f.name).join(',') // comma separated
    };
    console.log(payload);
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
            this.getGallery();
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
            this.getGallery();
          }
        },
        error: (err: any) => {
          this.toaster.error(err);
        }
      })
    }
  }
  editGallery(gallery: any) {
    this.isEdit = true;
    this.selectedGallery.patchValue({
      date: this.formatDate(gallery.date),
      imgUrl: gallery.imgUrl,
      title: gallery.title
    })
    this.id = gallery._id;
  }


  deleteGallery(id: any) {
    this.api.deleteGallery(id).subscribe({
      next: (res: any) => {
        if (res.success) {
          // alert(res.message);
          this.toaster.success(res.message);
          this.getGallery();

        }
      }
    })
  }
  formatDate(date: any) {
    let d = new Date(date);
    console.log(d);
    let year = d.getFullYear();
    let month = String(d.getMonth() + 1).padStart(2, '0');
    let day = String(d.getDate()).padStart(2, '0');;
    console.log(`${day}/${month}/${year}`);
    return `${year}-${month}-${day}`;


  }
}

