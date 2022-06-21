import {Body, Controller, Get, Post} from '@nestjs/common';
import {ClientServiceService} from "./clientService.service";
import {Observable} from "rxjs";

@Controller('client')
export class ClientServiceController {
    constructor(private readonly clientServiceService: ClientServiceService) {}

    @Get('alive')
    async getAlive() {
        // We should check if the user is connected
        return this.clientServiceService.getAlive();
    }
}
