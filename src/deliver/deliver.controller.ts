import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { DeliverService } from './deliver.service';

@Controller('deliver')
export class DeliverController {
    constructor(private readonly _service: DeliverService) {}

    @Post('')
    async create() {
        // We should check if the user is connected
        // check if he is posting his own profile
        return this._service.createDeliver();
    }

    @Get('alive')
    async isAlive() {
        return this._service.getAlive();
    }

    @Get(':globalUserId')
    async get(@Param('globalUserId') globalUserId: string) {
        // We should check if the user is connected
        // check if he is getting his own profile
        return this._service.getDeliver(+globalUserId);
    }

    @Post(':globalUserId')
    async update(@Param('globalUserId') globalUserId: string, @Body('data') data) {
        // We should check if the user is connected
        // check if he is update his own profile
        return this._service.updateDeliver(+globalUserId, data);
    }

    @Delete(':globalUserId')
    async delete(@Param('globalUserId') globalUserId: string) {
        // We should check if the user is connected
        // check if he is update his own profile
        return this._service.deleteDeliver(+globalUserId);
    }


    // GET LAT LONG => LISTE DE LIVREURS
}
