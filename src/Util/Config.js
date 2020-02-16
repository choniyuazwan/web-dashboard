const config = {
  api: {
    baseAddress: 'http://api-alpha.law-go.co.id/api',
    login: {
      post: '/authentication/login',
    },
    country: {
      get: '/administrative/country',
      post: '/administrative/country',
      put: '/administrative/country',
      del: '/administrative/country',
    }
  }
};

export default config;
