// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authUri: 'https://ea-beta.auth.eu-west-2.amazoncognito.com',
  redirectUri: 'https://localhost:4200/',
  clientId: '3j0feko5ai0b58d9k8ecdjupga',
  apiUri: 'https://ea-usage-tracking.london.cloudapps.digital/api/'
  //apiUri: 'https://localhost:44343/api/'
  //apiUri: 'https://q3c58w7tu3.execute-api.eu-west-2.amazonaws.com/beta/api/v1/'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
