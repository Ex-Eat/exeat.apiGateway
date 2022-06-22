import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
	constructor(private readonly _service: AppService) {}

	@Get('alive')
	isAlive(): string {
		return this._service.isAlive();
	}
}
