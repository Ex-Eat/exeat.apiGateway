import {Controller, Get, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {JwtGuard} from "./auth/jwt.guard";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    //@UseGuards(JwtGuard)
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
