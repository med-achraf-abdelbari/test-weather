// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  locationApiBaseUrl : 'http://api.openweathermap.org/geo/1.0/direct?q=',
  weatherApiBaseUrl : 'https://api.openweathermap.org/data/2.5/onecall',
  weatherApiKey : '010721642521f31b0fbc8c3831d45951'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
