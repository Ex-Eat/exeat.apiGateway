export const config = {
    APP_ENV: process.env.APP_ENV || 'PREPROD',
    APP_PORT: process.env.APP_PORT || '3005',
    TEMPLATE_SERVICE_PORT: process.env.TEMPLATE_SERVICE_PORT || '8299',
    TEMPLATE_SERVICE_HOST: process.env.TEMPLATE_SERVICE_HOST || '127.0.0.1',
    CLIENT_SERVICE_PORT: process.env.CLIENT_SERVICE_PORT || '8211',
    CLIENT_SERVICE_HOST: process.env.CLIENT_SERVICE_HOST || '127.0.0.1',
};