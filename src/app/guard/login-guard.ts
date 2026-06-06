import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth/auth';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  const currentUser = auth.currentUser();
  if (currentUser) {
    return router.createUrlTree(['/layout/dashboard'])
  }
  return true;
};
