export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ['\'self\'', 'https:'],
          'img-src': ['\'self\'', 'data:', 'blob:', 'storage.googleapis.com', 'market-assets.strapi.io'],
          'media-src': ['\'self\'', 'data:', 'blob:', 'storage.googleapis.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      jsonLimit: '10mb'
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
