import session from 'express-session';
import KeycloakConnect from 'keycloak-connect';

import keycloakConfig from '@config/keycloak';

class Keycloak {
  private static keycloak: KeycloakConnect.Keycloak;

  public static initKeycloak(): KeycloakConnect.Keycloak {
    if (this.keycloak) {
      return this.keycloak;
    }

    const memoryStore = new session.MemoryStore();
    this.keycloak = new KeycloakConnect({ store: memoryStore }, keycloakConfig);
    return this.keycloak;
  }

  public static getKeycloak(): KeycloakConnect.Keycloak {
    if (!this.keycloak) {
      return this.initKeycloak();
    }
    return this.keycloak;
  }
}

export default Keycloak;
