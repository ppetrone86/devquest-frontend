export const environment = {
  production: false,
  enableLogging: false,
  dryRun: false,
  appSettings: {
    title: 'White Label',
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
    whiteLabel: {
      url: 'https://white-label-backend.white-label.svc.cluster.local:8080',
      clientId: 'wlb',
      clientSecret: 'wlb',
      redirectURI: 'https://white-label-frontend.c5ecca2.kyma.ondemand.com/auth-processing',
      refreshTokenOffset: 120,
    },
    dummyJsonApi: {
      url: 'https://dummyjson.com',
    },
  },
};
