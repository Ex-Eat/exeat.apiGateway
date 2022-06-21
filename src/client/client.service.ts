import { Injectable } from '@nestjs/common';
import {
	ClientProxy,
	ClientProxyFactory,
	Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { config } from '../config';

@Injectable()
export class ClientService {
	private clientMS: ClientProxy;

	constructor() {
		this.clientMS = ClientProxyFactory.create({
			transport: Transport.TCP,
			options: {
				host: config.CLIENT_SERVICE_HOST,
				port: +config.CLIENT_SERVICE_PORT,
			},
		});
	}

	async getAlive(): Promise<Observable<string>> {
		return this.clientMS.send<string>({ cmd: 'alive' }, '');
	}
}
