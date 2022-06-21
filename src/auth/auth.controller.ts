import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

	constructor(private _service: AuthService) {
	}

	@Get('alive')
	async getAlive() {
		// We should check if the user is connected
		return this._service.getAlive();
	}

}
