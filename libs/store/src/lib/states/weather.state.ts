export interface WeatherState {
  weatherList: any[];
  activeWeatherCast : any
  error : string | null;
  loading : boolean;
}

export const weatherInitialState: WeatherState = {
  weatherList: [],
  activeWeatherCast : null,
  error: null,
  loading : true
};
