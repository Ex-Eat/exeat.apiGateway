import { Injectable } from '@nestjs/common';
import {
	ClientProxy,
	ClientProxyFactory,
	Transport,
} from '@nestjs/microservices';
import { config } from '../config';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
	private authMS: ClientProxy;

	constructor() {
		this.authMS = ClientProxyFactory.create({
			transport: Transport.TCP,
			options: {
				host: config.AUTH_SERVICE_HOST,
				port: +config.AUTH_SERVICE_PORT,
			},
		});
	}

	async getAlive(): Promise<Observable<string>> {
		return this.authMS.send<string>({ cmd: 'alive' }, '');
	}
}
