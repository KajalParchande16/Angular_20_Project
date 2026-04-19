import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class Gallery {

  constructor(private http:HttpClient) { }

   getGallary()
  {
   
      return this.http.get(`${environment.apiUrl}/gallary`);
  }
}

  
