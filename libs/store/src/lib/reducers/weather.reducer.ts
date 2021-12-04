import { WeatherActions } from '../actions/weather.actions';
import { weatherInitialState, WeatherState } from '../states/weather.state';
import { WeatherActionTypes } from '../types/weather.types';

function reducer(state = weatherInitialState, action: WeatherActions) {
  switch (action.type) {
    case WeatherActionTypes.GET_WEATHER:
      return {
        ...state,
        loading: true
      };
    case WeatherActionTypes.GET_WEATHER_SUCCESS:
      return {
        ...state,
        activeWeatherCast: action.payload,
        locations: [...state.weatherList, action.payload],
        loading: false
      };
    case WeatherActionTypes.GET_WEATHER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export function weatherReducer(state: WeatherState, action: WeatherActions) {
  return reducer(state, action);
}
