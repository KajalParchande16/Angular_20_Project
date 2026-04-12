import { Injectable } from '@angular/core';
import { Api } from '../api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment.js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private cs:Api,private http:HttpClient,private router:Router) { }

  login(data:{})
  {
   return this.http.post(`${environment.apiUrl}/auth/login`,data);
  }
  logOut()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])

  }

  isLoggedIn():boolean
  {
    return !!localStorage.getItem('token');  
  }

  getToken():string |null
  {
    return localStorage.getItem('token')
  }
}
