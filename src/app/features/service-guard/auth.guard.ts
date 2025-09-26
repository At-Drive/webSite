import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("jwtToken")
  if (token) {
    const router = new Router()
    router.navigate(['/home']) 
    return false
  }
  
  return true;
};
