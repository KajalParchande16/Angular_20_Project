import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth/auth';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService=inject(Auth);
  const router=inject(Router);

  const token=authService.getToken();
  // if(token)
  // {
  //   const cloneReq=req.clone({
  //     headers:req.headers.set('Authorization',`Bearer ${token}`)
  //   })
  //   return next(cloneReq);
  // }
  // return next(req);
  const authReq=token ? req.clone({
      headers:req.headers.set('Authorization',`Bearer ${token}`)
    }): req;

     return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 400) {
        // 🔥 TOKEN EXPIRED OR INVALID
        authService.logOut(); // remove token
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
