import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
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

  createOrder(formData: any): Observable<any> {
    return this.http.post(
      'http://localhost:3500/v1/website/order/createOrder',
      formData
    );
  }

  getAllOrder(userId:any): Observable<any> {
    return this.http.get(
      `http://localhost:3500/v1/website/order/getOrdersByUserId/${userId}`,
    );
  }

  getByIdOrder(id: any): Observable<any> {
    const headers = this.createHeader();

    return this.http.get(
      `http://localhost:3500/v1/website/order/getOrderById/${id}`,
      { headers }
    );
  }
  updateOrder(id: any, formData: any): Observable<any> {
    const headers = this.createHeader();

    return this.http.put(
      `http://localhost:3500/v1/website/order/updateOrder/${id}`,
      formData,       
    { headers } 
    );
  }
 deleteOrder(id: any): Observable<any> {
    const headers = this.createHeader();

    return this.http.delete(
      `http://localhost:3500/v1/website/order/deleteOrder/${id}`,
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
