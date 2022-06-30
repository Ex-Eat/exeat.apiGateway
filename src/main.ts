import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dayjs from 'dayjs';
import FR from 'dayjs/locale/fr';
import { config } from './config';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dayjs.locale(FR);

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	app.enableCors({
		origin: [`${config.TEMPLATE_APP_HOST}:${config.TEMPLATE_APP_PORT}`],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	});

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Exeat API')
		.setDescription('This API is the gathering point of all Exeat\'s microservices.')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('api', app, document);
	await app.listen(config.APP_PORT);
}

bootstrap();
