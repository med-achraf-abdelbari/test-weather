import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocationState } from '../states/location.state';

const locationSelectors = createFeatureSelector<LocationState>('location');

export const activeLocationSelector = createSelector(
  locationSelectors,
  state => state?.activeLocation
);

export const cachedLocationsSelector = createSelector(
  locationSelectors,
  state => state?.locations
);

export const locationErrorSelector = createSelector(
  locationSelectors,
  state => state?.error
);

