import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { config } from '../config';

@Injectable()
export class TestService {
	private testServiceClientService: ClientProxy;

	constructor() {
		this.testServiceClientService = ClientProxyFactory.create({
			transport: Transport.TCP,
			options: {
				host: config.TEMPLATE_SERVICE_HOST,
				port: +config.TEMPLATE_SERVICE_PORT,
			},
		});
	}

	async sumNumbers(data: Array<number>): Promise<Observable<number>> {
		return this.testServiceClientService.send<number>({cmd: 'sum'}, data);
	}

	async getItems(): Promise<Observable<number>> {
		return this.testServiceClientService.send<number>({cmd: 'getItems'}, '');
	}

	async postItem(): Promise<Observable<number>> {
		return this.testServiceClientService.send<number>({cmd: 'postItem'}, '');
	}

	async getAlive(): Promise<Observable<string>> {
		return this.testServiceClientService.send<string>({cmd: 'alive'}, '');
	}
}
