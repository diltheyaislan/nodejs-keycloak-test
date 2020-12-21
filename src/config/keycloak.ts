import KeycloakConnect from 'keycloak-connect';

export default {
  /*
  clientId: process.env.KEYCLOAK_CLIENT_ID,
  bearerOnly: true,
  serverUrl: process.env.KEYCLOAK_SERVER_URL,
  realm: process.env.KEYCLOAK_REALM,
  credentials: {
    secret: process.env.KEYCLOAK_SECRET,
  },
  */

  'auth-server-url': process.env.KEYCLOAK_SERVER_URL,
  resource: process.env.KEYCLOAK_CLIENT_ID,
  'bearer-only': process.env.KEYCLOAK_BEARER_ONLY,
  realm: process.env.KEYCLOAK_REALM,
} as KeycloakConnect.KeycloakConfig;
