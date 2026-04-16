import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Auth } from '../services/auth/auth';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const snackBar = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          alert('Session expired. Please login again.');
          authService.logOut();
          router.navigate(['/login']);
          break;

        case 403:
          alert('Access denied.');
          break;

        case 404:
          alert('API not found.');
          break;

        case 500:
          alert('Internal server error.');
          break;

        case 0:
          // alert("Unable to connect to server.")
          // alert('No internet connection.');
          // break;
          // if (!navigator.onLine) {
          //   alert('No internet connection.');
          // } else {
          //   alert('Unable to connect to server.');
          // }
          // break;
           snackBar.error(
            !navigator.onLine
              ? 'No internet connection.'
              : 'Unable to connect to server.'
          );
          break;

        default:
          // alert('Something went wrong.');
      }
      return throwError(() => error)

    })
  )
};
