import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from '../states/weather.state';

const WeatherSelectors = createFeatureSelector<WeatherState>('weather');

export const activeWeatherSelector = createSelector(
  WeatherSelectors,
  state => state?.activeWeatherCast
);

export const cachedWeathersSelector = createSelector(
  WeatherSelectors,
  state => state?.weatherList
);

export const weatherErrorSelector = createSelector(
  WeatherSelectors,
  state => state?.error
);

