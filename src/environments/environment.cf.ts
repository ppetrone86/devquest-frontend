export const environment = {
  production: false,
  enableLogging: true,
  mock: true,
  dryRun: false,
  appSettings: {
    title: 'Dev Quest',
    defaultRoutes: {
      fallbackAfterDeniedAccess: '/not-found-page',
      fallbackAfterNotFound: '/not-found-page',
      fallbackAfterLogin: '/private/my-dashboard',
    },
  },
  componentSettings: {
    chatMessage: {
      typingDelay: {
        min: 25,
        max: 60,
        pause: 100,
      },
    },
  },
  mocks: {
    networkDelayMs: 200,
    defaultUser: { id: 'mock-user', email: 'mock@devquest.local', roles: ['Admin'] },
    token: {
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
      token_type: 'Bearer',
      expires_in: 3600
    }
  },
  api: {
    devQuest: {
      url: 'http://localhost:8080',
      clientId: 'wlb',
      clientSecret: 'wlb',
      redirectURI: 'http://localhost:4200/auth-processing',
      refreshTokenOffset: 120,
    },
    dummyJsonApi: {
      url: 'https://dummyjson.com',
    },
  },
};
