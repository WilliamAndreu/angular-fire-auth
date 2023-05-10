// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { DataSources } from "src/app/providers/config/data-sources";

export const environment = {
  production: false,
  log: true,
  baseUrl: DataSources.DATA_URL,
  appData:DataSources.APP_DATA,
  publicEndpoints: DataSources.publicEndpoints,
  firebase: {
    apiKey: "AIzaSyAQio3c8NLIpQtR_ilts_tDJDA8Cpuk-s4",
    authDomain: "testauth-1caee.firebaseapp.com",
    projectId: "testauth-1caee",
    storageBucket: "testauth-1caee.appspot.com",
    messagingSenderId: "7386971427",
    appId: "1:7386971427:web:c285ddfcd813a4b223a096",
    measurementId: "G-SVBE8RWQNB"
  }
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
