export const config = {
	APP_ENV: process.env.APP_ENV || 'PREPROD',
	APP_PORT: process.env.APP_PORT || '3005',
	TEMPLATE_SERVICE_PORT: process.env.TEMPLATE_SERVICE_PORT || '8299',
	TEMPLATE_SERVICE_HOST: process.env.TEMPLATE_SERVICE_HOST || '127.0.0.1',
	CLIENT_SERVICE_PORT: process.env.CLIENT_SERVICE_PORT || '8211',
	CLIENT_SERVICE_HOST: process.env.CLIENT_SERVICE_HOST || '127.0.0.1',
	AUTH_SERVICE_PORT: process.env.AUTH_SERVICE_PORT || '8210',
	AUTH_SERVICE_HOST: process.env.AUTH_SERVICE_HOST || '127.0.0.1',
	RESTAURANT_SERVICE_PORT: process.env.RESTAURANT_SERVICE_PORT || '8212',
	RESTAURANT_SERVICE_HOST: process.env.RESTAURANT_SERVICE_HOST || '127.0.0.1',
	DELIVER_SERVICE_PORT: process.env.DELIVER_SERVICE_PORT || '8213',
	DELIVER_SERVICE_HOST: process.env.DELIVER_SERVICE_HOST || '127.0.0.1',
	ORDER_SERVICE_PORT: process.env.ORDER_SERVICE_PORT || '8214',
	ORDER_SERVICE_HOST: process.env.ORDER_SERVICE_HOST || '127.0.0.1',
	PAYMENT_SERVICE_PORT: process.env.PAYMENT_SERVICE_PORT || '8215',
	PAYMENT_SERVICE_HOST: process.env.PAYMENT_SERVICE_HOST || '127.0.0.1',
	PATRONAGE_SERVICE_PORT: process.env.PATRONAGE_SERVICE_PORT || '8217',
	PATRONAGE_SERVICE_HOST: process.env.PATRONAGE_SERVICE_HOST || '127.0.0.1',

	TEMPLATE_APP_PORT: process.env.TEMPLATE_SERVICE_PORT || '3000',
	TEMPLATE_APP_HOST: process.env.TEMPLATE_SERVICE_HOST || 'http://localhost',
};
