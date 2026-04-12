import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private http:HttpClient) { }

  

  getGallary()
  {
    return this.http.get(`${environment.apiUrl}/gallary`);

  }

  addGallery(payLoad:any)
  {
    return this.http.post(`${environment.apiUrl}/gallary`,payLoad);

  }
  getEvent()
  {
    return this.http.get(`${environment.apiUrl}/event`);
  }
  addEvent(payLoad:any)
  {
    return this.http.post(`${environment.apiUrl}/event`,payLoad);

  }
  
  updateEvent(id:any,payLoad:any)
  {
    return this.http.put(`${environment.apiUrl}/event/${id}`,payLoad);

  }
  deleteEvent(id:any)
  {
    return this.http.delete(`${environment.apiUrl}/event/${id}`);

  }
  getTeacher()
  {
    return this.http.get(`${environment.apiUrl}/teacher`);
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
  getNotice():Observable<any>
  {
    return this.http.get<ApiResponse<any[]>>(`${environment.apiUrl}/notice`);
  }
   addNotice(payLoad:any)
  {
    return this.http.post(`${environment.apiUrl}/notice`,payLoad);

  }
  
  updateNotice(id:any,payLoad:any)
  {
    return this.http.put(`${environment.apiUrl}/notice/${id}`,payLoad);

  }
  deleteNotice(id:any)
  {
    return this.http.delete(`${environment.apiUrl}/notice/${id}`);

  }
  
}

export interface ApiResponse<T> {
  notice: T;
  message: string;
  success: boolean;
}
