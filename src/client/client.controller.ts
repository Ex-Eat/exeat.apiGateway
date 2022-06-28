import { Controller, Get, Post } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
	constructor(private readonly _service: ClientService) {}

	@Get('alive')
	async getAlive() {
		// We should check if the user is connected
		return this._service.getAlive();
	}

	@Get('getAllUsers')
	async findAll() {
		// We should check if the user is connected
		return this._service.findAll();
	}

	@Post('createUser')
	async create(data) {
		// We should check if the user is connected
		return this._service.create(data);
	}
}
