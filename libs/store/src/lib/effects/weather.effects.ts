import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiService } from '../../../../services/src/lib/services/api.service';
import { WeatherActionTypes } from '../types/weather.types';
import { GetWeatherAction, GetWeatherActionFailure, GetWeatherActionSuccess } from '../actions/weather.actions';

@Injectable()
export class WeatherEffects {

  @Effect()
  getWeatherCast$ = this.$actions.pipe(
    ofType(WeatherActionTypes.GET_WEATHER),
    map((action: GetWeatherAction) => {
      return action.payload;
    }),
    switchMap((requestData: any) => {
      return this.apiService.getCastByLongLat(requestData.period, requestData.long, requestData.lat).pipe(map((res: any) => {
          return new GetWeatherActionSuccess(res);
        }), catchError((err: any) => {
          return of(new GetWeatherActionFailure(err));
        })
      );
    })
  );

  constructor(private $actions: Actions, private apiService: ApiService) {
  }

}
