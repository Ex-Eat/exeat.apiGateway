import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { DeliverService } from './deliver.service';

@Controller('deliver')
export class DeliverController {
    constructor(private readonly _service: DeliverService) {}

    @Post('')
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
}


const deliverObject = {
    globalUserId: "124",
    firstName: "firstName",
    lastName: "lastName",
    phoneNumber: "phoneNumber",
    birthDate: "2012-04-23T18:25:43.511Z",
    termsOfUse: true,
    location: {
        name: "name",
        address: "address",
        lat: 5.89898,
        lng: 4.90898,
    },
    patronageCode: "patronageCode",
    notification: true,
    movingRadius: true,
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
