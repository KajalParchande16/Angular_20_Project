import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notices',
  imports: [CommonModule],
  templateUrl: './notices.html',
  styleUrl: './notices.scss'
})
export class Notices implements OnInit {
  notices: any = [];
  selectedNotice: any = {};
  constructor(private apiService: Api, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    // this.apiService.getNotice();
    // this.getNotice();
    const res = this.route.snapshot.data['noticeData'];
    this.notices = res.notice;

  }

  getNotice() {
    // this.apiService.getNotice().subscribe({
    //   next:((res)=>{
    //     console.log(res);
    //     if(!!res.success)
    //     {
    //       this.notices=res.notice;
    //       console.log(this.notices);
    //       // let noticeList=res.notice.map((obj:any)=>{
    //       //   return obj.title;
    //       // });
    //       // console.log(noticeList);
    //       // this.notices=noticeList.join(" , ");
    //       // console.log(this.notices);
    //     }
    //   })
    // })
    this.apiService.notice$
      .subscribe(res => {
        this.notices = res;
      });
  }

  viewNotice(notice: any) {
    console.log(notice);
    this.selectedNotice = notice;
  }
}
