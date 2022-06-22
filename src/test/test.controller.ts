import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { Observable } from 'rxjs';

@Controller('test')
export class TestController {
	constructor(private readonly testServiceService: TestService) {}

	@Get('sum')
	async getSum(@Body('data') data: Array<number>): Promise<Observable<number>> {
		// We should check if the user is connected
		return this.testServiceService.sumNumbers(data);
	}

	@Post('item')
	async postItem() {
		// We should check if the user is connected
		return this.testServiceService.postItem();
	}

	@Get('item')
	async getItems() {
		// We should check if the user is connected
		return this.testServiceService.getItems();
	}

	@Get('alive')
	async getAlive() {
		// We should check if the user is connected
		return this.testServiceService.getAlive();
	}
}
