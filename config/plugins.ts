module.exports = {
    upload: {
      config: {
        provider: '@strapi-community/strapi-provider-upload-google-cloud-storage',
        providerOptions: {
            bucketName: 'circl-data-dev-eu-assets',
            publicFiles: true,
            uniform: true,
            basePath: '',
        },
      },
    },
    email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: 'alain.bansais@circl.fr',
        defaultReplyTo: 'alain.bansais@circl.fr',
      },
    },
  },
}
