import { locationInitialState, LocationState } from '../states/location.state';
import { LocationActions } from '../actions/location.actions';
import { LocationActionTypes } from '../types/location.types';

function reducer(state = locationInitialState, action: LocationActions) {
  switch (action.type) {
    case LocationActionTypes.GET_LOCATION_BY_CITY_NAME:
      return {
        ...state,
        loading: true
      };
    case LocationActionTypes.GET_LOCATION_BY_CITY_NAME_SUCCESS:
      return {
        ...state,
        activeLocation: action.payload[0],
        locations: [...state.locations, action.payload],
        loading: false
      };
    case LocationActionTypes.GET_LOCATION_BY_CITY_NAME_FAILURE:
      return {
        ...state,
        loading: false,
        activeLocation : null,
        error: action.payload
      };
    case LocationActionTypes.RESET_ERROR:
      return {
        ...state,
        activeLocation : null,
        error: null
      };
    default:
      return state;
  }
}

export function locationReducer(state: LocationState, action: LocationActions) {
  return reducer(state, action);
}
