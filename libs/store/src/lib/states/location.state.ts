export interface LocationState {
  locations: any[];
  activeLocation : any
  error : string | null;
  loading : boolean;
}

export const locationInitialState: LocationState = {
  locations: [],
  activeLocation : null,
  error: null,
  loading : true
};
