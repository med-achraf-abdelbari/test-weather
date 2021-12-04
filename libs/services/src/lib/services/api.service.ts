import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../apps/weather-test-app/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getLocationByCityName(cityName: string){
    return this.httpGet(`${environment.locationApiBaseUrl}${cityName}&limit=1&appid=${environment.weatherApiKey}`)
  }

  getCastByLongLat(period: string , long:number , lat:number){
    return this.httpGet(`${environment.weatherApiBaseUrl}?lat=${lat}&lon=${long}&exclude=current,minutely,${period},alerts&appid=${environment.weatherApiKey}`)
  }

  httpGet(endpoint: string, params?: any) {
    return this.http.get(endpoint);
  }
}
