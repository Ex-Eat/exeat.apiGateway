import {Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards} from '@nestjs/common';
import { DeliverService } from './deliver.service';
import {AuthenticatedGuard} from "../auth/authenticated.guard";
import {DeliverGuard} from "./deliver.guard";

@Controller('deliver')
export class DeliverController {
    constructor(private readonly _service: DeliverService) {}

    @Post('')
    @UseGuards(AuthenticatedGuard)
    async create(@Body('data') data: IDeliver) {
        // We should check if the user is connected
        // check if he is posting his own profile
        return this._service.createDeliver(data);
    }

    @Get('alive')
    async isAlive() {
        return this._service.getAlive();
    }

    @Get(':globalUserId')
    @UseGuards(AuthenticatedGuard, DeliverGuard)
    async get(@Param('globalUserId') globalUserId: string) {
        // We should check if the user is connected
        // check if he is getting his own profile

        return this._service.getDeliver(+globalUserId);
    }

    @Get('geocoding')
    @UseGuards(AuthenticatedGuard, DeliverGuard)
    async geocode(@Body('data') data) {
        // We should check if the user is connected
        // check if he is getting his own profile

        return this._service.geocoding(data);
    }

    @Post(':globalUserId')
    @UseGuards(AuthenticatedGuard, DeliverGuard)
    async update(@Param('globalUserId') globalUserId: string, @Body('data') data) {
        // We should check if the user is connected
        // check if he is update his own profile
        return this._service.updateDeliver(+globalUserId, data);
    }

    @Delete(':globalUserId')
    @UseGuards(AuthenticatedGuard, DeliverGuard)
    async delete(
        @Req() req,
        @Res() res,
        @Param('globalUserId') globalUserId: string
    ) {
        // We should check if the user is connected
        // check if he is update his own profile
        return this._service.deleteDeliver(+globalUserId);
    }
}

export interface IDeliver {
    globalUserId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthDate: Date;
    termsOfUse: boolean;
    location: ILocation;
    patronageCode: string;
    notification: boolean;
    movingRadius: number;
}

export interface ILocation {
    name: string;
    address: string;
    lat: number;
    lng: number;
}
