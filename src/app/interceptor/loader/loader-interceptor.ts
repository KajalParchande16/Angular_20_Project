import { HttpInterceptorFn } from '@angular/common/http';
import { Loader } from '../../services/loader/loader';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService=inject(Loader);
  loaderService.showLoader();
  return next(req).pipe(
    finalize(()=>{
      setTimeout(() => {
        loaderService.hideLoader()
      }, 2000);
    })
  )
};
