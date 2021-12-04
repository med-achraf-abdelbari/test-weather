import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocationState } from '../../states/location.state';
import { GetLocationByCityNameAction } from '../../actions/location.actions';
import { activeLocationSelector, cachedLocationsSelector, locationErrorSelector } from '../../selectors/location.selector';

@Injectable({
  providedIn: 'root'
})
export class LocationFacadeService {

  constructor(private store: Store<LocationState>) {
  }

  dispatchLocationByCityName(payload: any) {
    this.store.dispatch(new GetLocationByCityNameAction(payload));
  }

  getActiveLocation() {
    return this.store.select(activeLocationSelector);
  }

  getAllCachedLocations() {
    return this.store.select(cachedLocationsSelector);
  }

  getLocationError() {
    return this.store.select(locationErrorSelector);
  }

}
