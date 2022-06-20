import {Body, Controller, Get, Post} from '@nestjs/common';
import {TestServiceService} from "./testService.service";
import {Observable} from "rxjs";

@Controller('test')
export class TestServiceController {
    constructor(private readonly testServiceService: TestServiceService) {}

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
}
