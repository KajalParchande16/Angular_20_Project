import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { Auth } from '../services/auth/auth';

export const authGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  // if(authService.isLoggedIn())
  // {
  //   return true;

  // }
  // else{
  //   router.navigate(['login'])
  //   return false
  // }
  const currentUser = authService.currentUser();
  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  const allowedRoles = route.data?.['roles'] as string[];
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }
  if (allowedRoles.includes(currentUser.role)) {
    return true;
  }
  router.navigate(['/layout/dashboard']);
  return false;

};
