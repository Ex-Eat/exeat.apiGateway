import {Body, Controller, Delete, Get, Param, Post, Req, Res, UnauthorizedException, UseGuards} from '@nestjs/common';
import { DeliverService } from './deliver.service';
import {AuthenticatedGuard} from "../auth/authenticated.guard";
import {DeliverGuard} from "./deliver.guard";
import {AuthService} from "../auth/auth.service";
import {lastValueFrom} from "rxjs";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Deliver')
@Controller('deliver')
export class DeliverController {
    constructor(
        private _service: DeliverService,
        private authService: AuthService
    ) {}

    @Post('create')
    @UseGuards(AuthenticatedGuard)
    async create(@Body('data') data: IDeliver, @Req() req, @Res() res) {
        // We should check if the user is connected
        // check if he is posting his own profile
        if (req.user.id != data['globalUserId']) { return UnauthorizedException }
        await this._service.createDeliver(data);

        const tokens =  await lastValueFrom(this.authService.update({id: data['globalUserId'], isDeliverer: true}));
        res.cookie('access_token', tokens.accessToken, {
            httpOnly: true,
        })
            .cookie('refresh_token', tokens.refreshToken, {
                httpOnly: true,
            })
            .json(tokens.user)
            .send();
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

    @Post('geocoding')
    @UseGuards(AuthenticatedGuard)
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
    termsOfUse: boolean;
    location: ILocation;
    patronageCode: string;
    notification: boolean;
}

export interface ILocation {
    name: string;
    address: string;
    lat: number;
    lng: number;
}
