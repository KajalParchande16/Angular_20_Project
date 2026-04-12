import { Component, OnInit } from '@angular/core';
import { Api } from '../../../services/api';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-notice',
  imports: [RouterLink],
  templateUrl: './notice.html',
  styleUrl: './notice.scss'
})
export class Notice implements OnInit {
constructor(private apiService:Api){}
notices:any;
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
        let noticeList=res.notice.map((obj:any)=>{
          return obj.title;
        });
        // console.log(noticeList);
        this.notices=noticeList.join(" , ");
        // console.log(this.notices);
      }
    })
  })
}

}
