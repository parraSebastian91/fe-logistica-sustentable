// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // endPoint: 'https://logistica-sustentable.herokuapp.com/api/v1',
  endPoint: 'https://awkn.herokuapp.com//api/v1',
  firebaseConfig: {
    apiKey: 'AIzaSyDyWnKt7eUkYmGxD4oFGPq-l0aNN2ULCbk',
    authDomain: 'logistica-sustentable.firebaseapp.com',
    databaseURL: 'https://logistica-sustentable.firebaseio.com',
    projectId: 'logistica-sustentable',
    storageBucket: 'logistica-sustentable.appspot.com',
    messagingSenderId: '107758539205',
    appId: '1:107758539205:web:d46b7905d0056f6c54fbac',
    measurementId: 'G-DXRSJTM3NL'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
