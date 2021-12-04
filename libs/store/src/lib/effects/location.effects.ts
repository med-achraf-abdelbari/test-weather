import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { LocationActionTypes } from '../types/location.types';
import {
  GetLocationByCityNameAction,
  GetLocationByCityNameActionFailure,
  GetLocationByCityNameActionSuccess
} from '../actions/location.actions';
import { ApiService } from '../../../../services/src/lib/services/api.service';


@Injectable()
export class LocationEffects {

  @Effect()
  getLocationByCityName$ = this.$actions.pipe(
    ofType(LocationActionTypes.GET_LOCATION_BY_CITY_NAME),
    map((action: GetLocationByCityNameAction) => {
      return action.payload;
    }),
    switchMap((cityName: string) => {
      return this.apiService.getLocationByCityName(cityName).pipe(map((res: any) => {
          if(!res?.length){
            alert('No city found , please try again!')
            return of(new GetLocationByCityNameActionFailure('NO CITY FOUND'));
          }else{
            return new GetLocationByCityNameActionSuccess(res);
          }
        }), catchError((err: any) => {

          return of(new GetLocationByCityNameActionFailure(err));
        })
      );
    })
  );

  constructor(private $actions: Actions, private apiService: ApiService) {
  }

}
