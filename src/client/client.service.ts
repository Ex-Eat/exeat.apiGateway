import { Injectable } from '@nestjs/common';
import {
	ClientProxy,
	ClientProxyFactory,
	Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { config } from '../config';
import {IClientDto, ICreateClientDto, IUpdateClientDto} from 'src/_dto/IClientDto';

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

    async getAll(): Promise<Observable<string[]>> {
        return this.clientMS.send<string[]>({ cmd: 'client/getAll' }, '');
    }

	async getClientById(id: number): Promise<Observable<string>> {
		return this.clientMS.send<string>({ cmd: 'client/getOne' }, { id });
	}

	getClientByGlobalId(id: number): Observable<IClientDto> {
		return this.clientMS.send<IClientDto>({ cmd: 'client/getOneByGlobalId' }, id);
	}

	async create(client: ICreateClientDto): Promise<Observable<string>> {
        return this.clientMS.send<string>({ cmd: 'client/create' }, { client });
    }

	async updateClient(id: number, client: IUpdateClientDto): Promise<Observable<string>> {
		return this.clientMS.send<string>({ cmd: 'client/update' }, { id, client });
	}

	async deleteClient(id: number): Promise<Observable<string>> {
		return this.clientMS.send<string>({ cmd: 'client/delete' }, { id });
	}
}
