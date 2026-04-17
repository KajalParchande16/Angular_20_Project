import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from '../../environment/environment';
import { BehaviorSubject, delay, Observable, shareReplay, tap } from 'rxjs';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private http:HttpClient) { }

  gallery$!: Observable<any>;
  event$!:Observable<any>;
  private noticeSub=new BehaviorSubject<any[] | null>(null);

  notice$=this.noticeSub.asObservable();


  // getGallary()
  // {
  //   return this.http.get(`${environment.apiUrl}/gallary`).pipe(delay(5000));

  // }
  getGallary()
  {
    if(!this.gallery$)
    {
      this.gallery$=this.http.get(`${environment.apiUrl}/gallary`).pipe(shareReplay(1))
    }
    return this.gallery$;
  }

  // addGallery(payLoad:any)
  // {
  //   return this.http.post(`${environment.apiUrl}/gallary`,payLoad);

  // }
  addGallery(payLoad:any)
  {
    return this.http.post(`${environment.apiUrl}/gallary`,payLoad).pipe(
      tap(()=>{
        this.gallery$=undefined!;
      })
    )

  }
  deleteGallery(id:any)
  {
    return this.http.delete(`${environment.apiUrl}/gallary/${id}`).pipe(
      tap(()=>{
        this.gallery$=undefined!;
      })
    );

  }
  // getEvent()
  // {
  //   return this.http.get(`${environment.apiUrl}/event`).pipe(delay(7000));
  // }
  getEvent()
  {
    if(!this.event$)
    {

      this.event$= this.http.get(`${environment.apiUrl}/event`).pipe(shareReplay(1));
    }
    return this.event$;
    
  }
  addEvent(payLoad:any)
  {
    return this.http.post(`${environment.apiUrl}/event`,payLoad).pipe(
      tap(()=>this.event$=undefined!
      )
    );

  }
  
  updateEvent(id:any,payLoad:any)
  {
    return this.http.put(`${environment.apiUrl}/event/${id}`,payLoad).pipe(
      tap(()=>this.event$=undefined!)
    );

  }
  deleteEvent(id:any)
  {
    return this.http.delete(`${environment.apiUrl}/event/${id}`).pipe(
      tap(()=>this.event$=undefined!)
    );

  }
  getTeacher()
  {
    return this.http.get(`${environment.apiUrl}/teacher`).pipe(delay(9000));
  }
   addTeacher(payLoad:any)
  {
    return this.http.post(`${environment.apiUrl}/teacher`,payLoad);

  }
  
  updateTeacher(id:any,payLoad:any)
  {
    return this.http.put(`${environment.apiUrl}/teacher/${id}`,payLoad);

  }
  deleteTeacher(id:any)
  {
    return this.http.delete(`${environment.apiUrl}/teacher/${id}`);

  }
  createContact(payload:any)
  {
    return this.http.post(`${environment.apiUrl}/contact`,payload);

  }
  getContact()
  {
    return this.http.get(`${environment.apiUrl}/contact`);
  }
  deleteContact(id:any)
  {
    return this.http.delete(`${environment.apiUrl}/contact/${id}`);

  }
  getNoticeApi():Observable<any>
  {
    return this.http.get<ApiResponse<any[]>>(`${environment.apiUrl}/notice`);
  }
  getNotice(forceCall=false)
  {
    if(this.noticeSub.value===null || forceCall){
     this.http.get<ApiResponse<any[]>>(`${environment.apiUrl}/notice`).subscribe((res:any)=>{
      console.log(res);
      this.noticeSub.next(res.notice || []);
    })
  }
  }
   addNotice(payLoad:any)
  {
    return this.http.post(`${environment.apiUrl}/notice`,payLoad).pipe(
      tap((res:any)=>{
        if(res.success)
        {
          this.getNotice(true);
        }
      })
    )

  }
  
  updateNotice(id:any,payLoad:any)
  {
    return this.http.put(`${environment.apiUrl}/notice/${id}`,payLoad).pipe(
      tap((res:any)=>{
        if(res.success)
        {
          this.getNotice(true);
        }
      })
    )

  }
  deleteNotice(id:any)
  {
    return this.http.delete(`${environment.apiUrl}/notice/${id}`).pipe(
      tap((res:any)=>{
        if(res.success)
        {
          this.getNotice(true);
        }
      })
    )

  }
  
}

export interface ApiResponse<T> {
  notice: T;
  message: string;
  success: boolean;
}
