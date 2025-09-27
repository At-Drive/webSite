import { CanActivateFn, Router } from '@angular/router';

export const productGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("jwtToken")
  if (!token) {
    const router = new Router()
    router.navigate(['auth/login']) 
    return false
  }
  
  return true;
};
