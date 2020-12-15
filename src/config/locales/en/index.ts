export default {
  app: {
    errors: {
      internalServer: 'Internal server error',
    },
  },

  /* Middlewares */
  middlewares: {
    ensureAuthenticated: {
      JWTtokenMissing: 'JWT token is missing',
      InvalidJWTToken: 'JWT token is invalid',
    },
    hasPermission: {
      accessDenied: 'Access denied',
    },
  },

  /* Auth */
  auth: {
    invalidCredentials: 'Invalid credentials',
    inactiveAccount: 'Inactive account',
  },

  /* Mail */
  mail: {
    errorSendingEmail: 'There was an error sending the email',
    subject: {
      userActivation: 'Account activation',
    },
  },

  /* Resources */
  resources: {
    user: 'User',
    users: {
      alreadyActivated: 'User already active',
      requestPasswordTokenExpired: 'Password change request token expired',
      userNotFound: 'User not found',
    },
    permission: 'Permission',
    permissions: {
      alreadyExists: 'Permission already exists',
      notFound: 'Permission not found',
    },
    role: 'Role',
    roles: {
      alreadyActivated: 'Role already exists',
      notFound: 'Role not found',
    },
  },

  /* Validation */
  validation: {
    invalidUUID: 'UUID value is invalid',
    resourceNotFound: ':resource not found',
    alreadyExists: 'Already exists',
    invalidValue: 'Invalid value',
    emailAlreadyUsed: 'E-mail address is already in use',
    invalidCurrentPassword: 'Ccurrent password is invalid',
    oldPasswordIsRequired: 'Old password is required to set the new password',
    oldPasswordNotMatch: 'Old password does not match',
    onlyImageJpgPngAccepted: 'Only JPG or PNG images are accepted',
  },
};
