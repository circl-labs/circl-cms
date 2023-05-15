module.exports = {
    upload: {
      config: {
        provider: '@strapi-community/strapi-provider-upload-google-cloud-storage',
        providerOptions: {
            bucketName: 'circl-data-dev-eu-assets',
            publicFiles: false,
            uniform: false,
            basePath: '',
        },
      },
    },
}
