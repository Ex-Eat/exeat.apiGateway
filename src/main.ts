import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dayjs from 'dayjs';
import FR from 'dayjs/locale/fr';
import { config } from './config';
import * as cookieParser from 'cookie-parser';

dayjs.locale(FR);

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	await app.listen(config.APP_PORT);
}

bootstrap();
