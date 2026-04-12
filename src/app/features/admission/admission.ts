import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admission',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './admission.html',
  styleUrl: './admission.scss'
})
export class Admission  implements OnInit{
  admissionForm!: FormGroup;
  showPdfModal: boolean=false;
  pdfUrl!: SafeResourceUrl;
  // newAdmissionForm = new FormGroup({
  //   studDetails: new FormGroup({
  //     name: new FormControl("", Validators.required)
  //   })
  // });
  constructor(private fb: FormBuilder,private sanitizer: DomSanitizer) {

    this.admissionForm = fb.group({
      studentDetails: fb.group({
        studentName: ["", Validators.required],
        dob: ["", Validators.required],
        gender: ["", Validators.required],
        age: ["", [Validators.required, Validators.min(3), Validators.max(18)]],
        bloodGroup: [""],
        religion: ["", Validators.required],
        castCategory: ["", Validators.required],
        nationality: ["", Validators.required],
        motherTongue: ["", Validators.required],
        aadhaar: ["", Validators.required],
      }),
      admissionDetails: fb.group({
        admissionClass: ["", Validators.required],
        academicYear: ["", Validators.required],
        preSchool: [""],
        reasonLeaving: [""],
      }),
      father: fb.group({
        name: ["", Validators.required],
        qualification: ["", Validators.required],
        occupation: ["", Validators.required],
        office: [""],
        contact: ["", Validators.required],
        email: ["",],
        aadhaar: ["", Validators.required],
      }),
      mother: fb.group({
        name: ["", Validators.required],
        qualification: ["", Validators.required],
        occupation: ["", Validators.required],
        office: [""],
        contact: ["", Validators.required],
        email: [""],
        aadhaar: ["", Validators.required],
      }),
      guardian: fb.group({
        name: [""],
        relationship: [""],
        contact: [""],
        address: [""],
      }),
      addressDetails: fb.group({
        presentAddress: ["", Validators.required],
        permanentAddress: ["", Validators.required],
        emergencyContact: ["", Validators.required],
        alternateContact: ["",Validators.required],
      }),
      documents:fb.group({
        studentPhoto:[null,Validators.required]
      }),
      declaration:fb.group({
        agree:[false,Validators.requiredTrue],
        declarationDate:['',Validators.required]
      }),
    })
  }

  ngOnInit(): void {
    console.log(this.admissionForm.value);
  }

  

  copyAddress(event:Event)
  {
    let isChecked=(event.target as HTMLInputElement).checked;
    let present=this.admissionForm.get('addressDetails.presentAddress');
    let permanent=this.admissionForm.get('addressDetails.permanentAddress');

    // console.log(isChecked,present);
    console.log(isChecked && present && permanent);
    if(isChecked && present && permanent)
    {
      permanent?.setValue(present.value);
      permanent?.disable();
    }
    else{
      permanent?.enable();
    }
  }

  onImageSelect(event:Event)
  {
    let file=(event.target as HTMLInputElement).files?.[0];
    console.log(file);
    if(!!file)
    {
      const reader=new FileReader();
      reader.onload=()=>{
        this.admissionForm.get('documents.studentPhoto')?.setValue(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }
  generatePDF()
  {
    // console.log(this.admissionForm.value);
    const content=document.getElementById('pdf');
    if(content)
    {
      html2canvas(content).then((canvas)=>{
        const imgData=canvas.toDataURL('img/png');
        const pdf=new jsPDF('p','mm','a4');
        const imgProps=pdf.getImageProperties(imgData);
        const pdfWidth=pdf.internal.pageSize.getWidth();
        const pdfHeight=(imgProps.height * pdfWidth)/imgProps.width;

        pdf.addImage(imgData,'PNG', 0,0, pdfWidth,pdfHeight);
        // pdf.save('admission-form.pdf');
         const pdfBlob = pdf.output('blob');
        const url = URL.createObjectURL(pdfBlob);
         this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.showPdfModal = true;
      })
    }

  }

   closeModal() {
    this.showPdfModal = false;
  }
}
