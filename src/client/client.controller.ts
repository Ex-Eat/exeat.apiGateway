import { Controller, Get } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
	constructor(private readonly clientServiceService: ClientService) {}

	@Get('alive')
	async getAlive() {
		// We should check if the user is connected
		return this.clientServiceService.getAlive();
	}
}
