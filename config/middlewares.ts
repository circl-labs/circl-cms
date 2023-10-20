export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ['\'self\'', 'https:'],
          'img-src': ['\'self\'', 'data:', 'blob:', 'storage.googleapis.com'],
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
      // jsonLimit: '10mb' // Change me if there is a need to import large file
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
