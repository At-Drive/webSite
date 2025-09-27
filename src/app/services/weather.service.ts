import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class WeatherService  {
  constructor(private http: HttpClient, public router: Router) {}

   private apiKey = 'bd5e378503939ddaee76f12ad7a97608';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';


  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
  }
}
