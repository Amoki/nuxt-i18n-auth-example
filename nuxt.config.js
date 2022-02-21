export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'marketplace',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    middleware: ['auth'],
  },

  auth: {
    strategies: {
      oidc: {
        scheme: 'openIDConnect',
        clientId: process.env.CLIENT_ID,
        issuer: process.env.OIDC_ISSUER,
        scope:  ['openid', 'profile', 'email'],
        idToken: {
          maxAge: 60 * 60 * 1, // 1 hour
        },
        token: {
          maxAge: 60 * 60 * 1, // 1 hour
        },
        refreshToken: {
          maxAge: 60 * 60 * 1, // 1 hour
        },
        endpoints: {
          configuration: process.env.OIDC_ISSUER + '/.well-known/openid-configuration',
        },
        responseType: 'code',
        grantType: 'authorization_code',
        codeChallengeMethod: 'S256',
        fetchUser: true,
        logoutRedirectUri: process.env.APP_URL,
      },
    },
    redirect: {
      login: '/login',
      logout: '/',
      home: '/',
      callback: '/oidc-callback',
    },
    watchLoggedIn: true,
    resetOnError: true,
    cookie: {
      options: {
        secure: true,
        domain: null,
      },
    },
    token: {
      global: false,
    }
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
      cookieSecure: true,
      cookieDomain: null,
    },
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome',
        },
        fr: {
          welcome: 'Bienvenue',
        },
        es: {
          welcome: 'Bienvenido',
        },
      },
    },
  },
}
