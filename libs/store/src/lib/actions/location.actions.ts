import { Action } from '@ngrx/store';
import { LocationActionTypes } from '../types/location.types';

export class GetLocationByCityNameAction implements Action {
  readonly type = LocationActionTypes.GET_LOCATION_BY_CITY_NAME;
  constructor(public payload: string) {
  }
}

export class GetLocationByCityNameActionSuccess implements Action {
  readonly type = LocationActionTypes.GET_LOCATION_BY_CITY_NAME_SUCCESS;
  constructor(public payload: any) {
  }
}

export class GetLocationByCityNameActionFailure implements Action {
  readonly type = LocationActionTypes.GET_LOCATION_BY_CITY_NAME_FAILURE;
  constructor(public payload: any) {
  }
}

export type LocationActions =
  GetLocationByCityNameAction
| GetLocationByCityNameActionSuccess
| GetLocationByCityNameActionFailure
