import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiService } from '../../../../services/src/lib/services/api.service';
import { WeatherActionTypes } from '../types/weather.types';
import { GetWeatherAction, GetWeatherActionFailure, GetWeatherActionSuccess } from '../actions/weather.actions';
import { WeatherFacadeService } from '../facades/weather/weather-facade.service';

@Injectable()
export class WeatherEffects {

  weatherCache: any[] = [];

  @Effect()
  getWeatherCast$ = this.$actions.pipe(
    ofType(WeatherActionTypes.GET_WEATHER),
    map((action: GetWeatherAction) => {
      return action.payload;
    }),
    switchMap((requestData: any) => {
      let result: any;
      const cached = this.checkCache(requestData);
      if (cached) {
        return of(new GetWeatherActionSuccess(cached));
      }
      result = this.apiService.getCastByLongLat(requestData.period, requestData.long, requestData.lat).pipe(map((res: any) => {
          this.weatherCache.push(res);
          console.log(this.weatherCache);
          return new GetWeatherActionSuccess(res);
        }), catchError((err: any) => {
          return of(new GetWeatherActionFailure(err));
        })
      );
      return result;
    })
  );

  constructor(private $actions: Actions, private apiService: ApiService, private weatherfacade: WeatherFacadeService) {
  }

  checkCache(requestData: any) {
    return this.weatherCache.filter((weather: any) => {
      return weather[requestData.period == 'daily' ? 'hourly' : 'daily'] && weather.lat == requestData.lat && weather.lon == requestData.long;
    })[0];
  }

}
