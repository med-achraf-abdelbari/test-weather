import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherState } from '../../states/weather.state';
import { GetWeatherAction } from '../../actions/weather.actions';
import { activeWeatherSelector, cachedWeathersSelector, weatherErrorSelector } from '../../selectors/weather.selector';

@Injectable({
  providedIn: 'root'
})
export class WeatherFacadeService {

  constructor(private store: Store<WeatherState>) {
  }

  dispatchGetWeather(payload: any) {
    this.store.dispatch(new GetWeatherAction(payload));
  }

  getActiveLocation() {
    return this.store.select(activeWeatherSelector);
  }

  getAllCachedWeathers() {
    return this.store.select(cachedWeathersSelector);
  }

  getLocationError() {
    return this.store.select(weatherErrorSelector);
  }

}
