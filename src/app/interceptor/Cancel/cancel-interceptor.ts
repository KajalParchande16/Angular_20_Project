import { HttpInterceptorFn } from '@angular/common/http';
import { Cancle } from '../../services/requestCancle/cancle';
import { inject } from '@angular/core';
import { takeUntil } from 'rxjs';

export const cancelInterceptor: HttpInterceptorFn = (req, next) => {

  const cancelSer=inject(Cancle);
  return next(req).pipe(
    takeUntil(cancelSer.getCancelNotifier())
  )
};
