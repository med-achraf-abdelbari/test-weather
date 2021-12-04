import { Action } from '@ngrx/store';
import { WeatherActionTypes } from '../types/weather.types';

export class GetWeatherAction implements Action {
  readonly type = WeatherActionTypes.GET_WEATHER;
  constructor(public payload: any) {
  }
}

export class GetWeatherActionSuccess implements Action {
  readonly type = WeatherActionTypes.GET_WEATHER_SUCCESS;
  constructor(public payload: any) {
  }
}

export class GetWeatherActionFailure implements Action {
  readonly type = WeatherActionTypes.GET_WEATHER_FAILURE;

  constructor(public payload: any) {
  }
}

export type WeatherActions =
  GetWeatherAction
  | GetWeatherActionSuccess
  | GetWeatherActionFailure
