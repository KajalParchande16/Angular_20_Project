import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { BehaviorSubject, delay, map, Observable, retry, shareReplay, tap } from 'rxjs';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private http: HttpClient) { }

  gallery$!: Observable<any>;
  event$!: Observable<any>;
  private noticeSub = new BehaviorSubject<any[] | null>(null);

  notice$ = this.noticeSub.asObservable();


  // getGallary()
  // {
  //   return this.http.get(`${environment.apiUrl}/gallary`).pipe(delay(5000));

  // }
  getGallary() {
    // if(!this.gallery$)
    // {
    return this.http.get(`${environment.apiUrl}/gallary`);
  }
  getGallery(page: number, limit: number) {
    return this.http.get(
      `${environment.apiUrl}/gallary?page=${page}&limit=${limit}`
    );
  }

  // addGallery(payLoad:any)
  // {
  //   return this.http.post(`${environment.apiUrl}/gallary`,payLoad);

  // }
  addGallery(payLoad: any) {
    return this.http.post(`${environment.apiUrl}/gallary`, payLoad);


  }
  updateGallery(id: any, payLoad: any) {
    return this.http.put(`${environment.apiUrl}/gallary/${id}`, payLoad);

  }
  deleteGallery(id: any) {
    return this.http.delete(`${environment.apiUrl}/gallary/${id}`);

  }
  // getEvent()
  // {
  //   return this.http.get(`${environment.apiUrl}/event`).pipe(delay(7000));
  // }
  getEvent() {
    if (!this.event$) {

      this.event$ = this.http.get(`${environment.apiUrl}/event`).pipe(shareReplay(1));
    }
    return this.event$;

  }
  addEvent(payLoad: any) {
    return this.http.post(`${environment.apiUrl}/event`, payLoad).pipe(
      tap(() => this.event$ = undefined!
      )
    );

  }

  updateEvent(id: any, payLoad: any) {
    return this.http.put(`${environment.apiUrl}/event/${id}`, payLoad).pipe(
      tap(() => this.event$ = undefined!)
    );

  }
  deleteEvent(id: any) {
    return this.http.delete(`${environment.apiUrl}/event/${id}`).pipe(
      tap(() => this.event$ = undefined!)
    );

  }
  getTeacher() {
    return this.http.get(`${environment.apiUrl}/teacher`).pipe(delay(9000));
  }
  addTeacher(payLoad: any) {
    return this.http.post(`${environment.apiUrl}/teacher`, payLoad);

  }

  updateTeacher(id: any, payLoad: any) {
    return this.http.put(`${environment.apiUrl}/teacher/${id}`, payLoad);

  }
  deleteTeacher(id: any) {
    return this.http.delete(`${environment.apiUrl}/teacher/${id}`);

  }
  createContact(payload: any) {
    return this.http.post(`${environment.apiUrl}/contact`, payload);

  }
  getContact() {
    return this.http.get(`${environment.apiUrl}/contact`);
  }
  deleteContact(id: any) {
    return this.http.delete(`${environment.apiUrl}/contact/${id}`);

  }
  getNoticeApi(): Observable<any> {
    return this.http.get<ApiResponse<any[]>>(`${environment.apiUrl}/notice`);
  }
  getNotice(forceCall = false) {
    if (this.noticeSub.value === null || forceCall) {
      this.http.get<ApiResponse<any[]>>(`${environment.apiUrl}/notice`).subscribe((res: any) => {
        console.log(res);
        this.noticeSub.next(res.notice || []);
      })
    }
  }
  addNotice(payLoad: any) {
    return this.http.post(`${environment.apiUrl}/notice`, payLoad).pipe(
      tap((res: any) => {
        if (res.success) {
          this.getNotice(true);
        }
      })
    )

  }

  updateNotice(id: any, payLoad: any) {
    return this.http.put(`${environment.apiUrl}/notice/${id}`, payLoad).pipe(
      tap((res: any) => {
        if (res.success) {
          this.getNotice(true);
        }
      })
    )

  }
  deleteNotice(id: any) {
    return this.http.delete(`${environment.apiUrl}/notice/${id}`).pipe(
      tap((res: any) => {
        if (res.success) {
          this.getNotice(true);
        }
      })
    )

  }

  getUsers() {
    return new Promise((res, rej) => {
      this.http.get(`${environment.apiUrl}/user`).subscribe((data: any) => {
        try {
          if (data.success) {
            res(data);
          }
          else {
            rej(new Error("API returned success=false"));
          }
        } catch (error) {
          rej([]);
        }
      })
    })

  }

  getAdmission(payload?: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/admissions`, payload).pipe(
      map((res: any) => res.data), retry(1)
    )
  }
}

export interface ApiResponse<T> {
  notice: T;
  message: string;
  success: boolean;
}
