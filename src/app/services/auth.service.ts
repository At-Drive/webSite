import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, public router: Router) {}

  private createHeader(): HttpHeaders {
    let localData: any = localStorage.getItem('jwtToken');
    const token = JSON.parse(localData).token;
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  create(formData: any): Observable<any> {
    return this.http.post(
      'http://localhost:3000/v1/website/userauth/create',
      formData
    );
  }

  login(formData: any): Observable<any> {
    return this.http.post(
      'http://localhost:3000/v1/website/userauth/loginuser',
      formData
    );
  }

  getById(id: any): Observable<any> {
    const headers = this.createHeader();

    return this.http.get(
      `http://localhost:3000/v1/website/userauth/getById/${id}`,
      { headers }
    );
  }

  logout() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('registeredUser');
      console.log('User logged out successfully.');
      this.router.navigate(['/login']);
    } else {
      console.log('No token found, redirecting to login.');
      this.router.navigate(['/login']);
    }
  }
}
