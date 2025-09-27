import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  city: string = 'Nagpur';
  weatherData: any;

  constructor(private weatherService: WeatherService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe((success) => {
      console.log(success.data);
      this.weatherData = success;
    });
  }
  goBack(){
    this.location.back();
  }
}
