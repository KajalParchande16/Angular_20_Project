import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notices',
  imports: [CommonModule],
  templateUrl: './notices.html',
  styleUrl: './notices.scss'
})
export class Notices  implements OnInit{
  notices:any=[];
  selectedNotice:any={};
  constructor(private apiService:Api)
  {

  }
  ngOnInit(): void {
    this.getNotice();
  }

  getNotice()
{
  this.apiService.getNotice().subscribe({
    next:((res)=>{
      console.log(res);
      if(!!res.success)
      {
        this.notices=res.notice;
        console.log(this.notices);
        // let noticeList=res.notice.map((obj:any)=>{
        //   return obj.title;
        // });
        // console.log(noticeList);
        // this.notices=noticeList.join(" , ");
        // console.log(this.notices);
      }
    })
  })
}

viewNotice(notice:any)
{
console.log(notice);
this.selectedNotice=notice;
}
}
