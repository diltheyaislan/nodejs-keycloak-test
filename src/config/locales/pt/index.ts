export default {
  app: {
    errors: {
      internalServer: 'Erro interno de servidor',
    },
  },

  /* Middlewares */
  middlewares: {
    ensureAuthenticated: {
      JWTtokenMissing: 'O token JWT não foi encontrado',
      InvalidJWTToken: 'O token JWT é inválido',
    },
    hasPermission: {
      accessDenied: 'Acesso negado',
    },
  },

  /* Auth */
  auth: {
    invalidCredentials: 'Crendenciais inválidas',
    inactiveAccount: 'Conta inativa',
  },

  /* Mail */
  mail: {
    errorSendingEmail: 'Ocorreu um erro ao enviar o email',
    subject: {
      userActivation: 'Ativação de conta',
    },
  },

  /* Resources */
  resources: {
    user: 'Usuário',
    users: {
      alreadyActivated: 'Usuário já ativo',
      requestPasswordTokenExpired:
        'Token de solicitação de mudança de senha expirou',
      userNotFound: 'Usuário não encontrado',
    },
    permission: 'Permissão',
    permissions: {
      alreadyExists: 'Permissão já existe',
      notFound: 'Permissão não encontrada',
    },
    role: 'Função',
    roles: {
      alreadyActivated: 'Função já existe',
      notFound: 'Função não encontrada',
    },
  },

  /* Validation */
  validation: {
    invalidUUID: 'Valor UUID inválido',
    resourceNotFound: ':resource não encontrado',
    alreadyExists: 'Item já existe',
    invalidValue: 'Valor inválido',
    emailAlreadyUsed: 'Endereço de e-mail já está em uso',
    invalidCurrentPassword: 'Senha atual inválida',
    oldPasswordIsRequired:
      'Senha antiga é necessária para definir a nova senha',
    oldPasswordNotMatch: 'Senha antiga não confere',
    onlyImageJpgPngAccepted: 'Somente imagens JPG ou PNG são aceitas',
  },
};
