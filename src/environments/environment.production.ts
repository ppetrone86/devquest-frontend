export const environment = {
  production: false,
  enableLogging: false,
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
  api: {
    devQuest: {
      url: 'http://localhost:8080',
      clientId: 'wlb',
      clientSecret: 'wlb',
      redirectURI: 'https://dev-quest-frontend.c5ecca2.kyma.ondemand.com/auth-processing',
      refreshTokenOffset: 120,
    },
    dummyJsonApi: {
      url: 'https://dummyjson.com',
    },
  },
};
