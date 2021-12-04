import { ActionReducerMap } from '@ngrx/store';
import { LocationState } from '../states/location.state';
import { locationReducer } from '../reducers/location.reducer';
import { LocationEffects } from '../effects/location.effects';
import { WeatherState } from '../states/weather.state';
import { weatherReducer } from '../reducers/weather.reducer';
import { WeatherEffects } from '../effects/weather.effects';

export interface AppStates {
  location: LocationState;
  weather: WeatherState;
}

export const appReducers: ActionReducerMap<AppStates> = {
  location: (locationReducer as any),
  weather: (weatherReducer as any)
};

export const appEffect = [
  LocationEffects,
  WeatherEffects
];
