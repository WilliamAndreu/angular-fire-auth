export class DataSources {
  //urls api
  public static DATA_URL = Object.freeze({
    DEV: " https://dev-base-url.net",
    PROD: "https://prod-base-url.net",
    LOCALWEB: "localhost:8000",
  });
  public static APP_DATA = Object.freeze({
    grant_type:"password",
    client_id:"my_client_id",
    client_secret:"my_client_secret"
  })

  public static FIREBASEE_DATASOURCES = Object.freeze({
    DEV: {
      apiKey: "AIzaSyCvs_-ibUALwtOPV2u58lqoDN0zo0fnT_o",
      authDomain: "<app>.firebaseapp.com",
      databaseURL: "https://<app>.firebaseio.com/",
      projectId: "<app-id>",
      storageBucket: "<app>.appspot.com",
      messagingSenderId: "<sender-id>",
      appId: "<id>",
    },
    PROD: {
      apiKey: "AIzaSyCvs_-ibUALwtOPV2u58lqoDN0zo0fnT_o",
      authDomain: "<app>.firebaseapp.com",
      databaseURL: "https://<app>.firebaseio.com/",
      projectId: "<app-id>",
      storageBucket: "<app>.appspot.com",
      messagingSenderId: "<sender-id>",
      appId: "<id>",
    },
  });

  public static publicEndpoints = [
    {
        method: 'POST',
        endpoint: '/auth/token',
    },
    {
        method: 'GET',
        endpoint: './assets/i18n/es.json',
    },
    {
      method: 'GET',
      endpoint: '/policies/terms_and_conditions'
    },
    {
      method: 'GET',
      endpoint: '/policies/privacy_policies'
    },
    {
      method: 'GET',
      endpoint: '/app_version/'
    },
  ]

  public static baseUrlDefault = DataSources.DATA_URL.DEV; // TODO revisar antes de publicar

  public static firebaseCurrentConfig = DataSources.FIREBASEE_DATASOURCES.PROD; // TODO revisar antes de publicar
}
