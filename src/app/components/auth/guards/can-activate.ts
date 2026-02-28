import { CanActivateFn } from '@angular/router';
import { AuthServices } from '../../../services/auth/auth.services';
import { inject } from '@angular/core';

export const CanActivateAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthServices);
  if (authService.isAuthenticated()) {
    return true;
  } else {
    authService.redirectToLogin();
    return false;
  }
};
