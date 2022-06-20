import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import {Observable} from "rxjs";
import {config} from "../config";

@Injectable()
export class TestServiceService {
    private testServiceClientService: ClientProxy

    constructor() {
        this.testServiceClientService = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: 'exeat.boilerplate-service',
                port: +config.BOILERPLATE_SERVICE_PORT
            }
        })
    }

    async sumNumbers(data: Array<number>): Promise<Observable<number>> {
        return this.testServiceClientService.send<number>('sum', data)
    }


    async getItems(): Promise<Observable<number>> {
        return this.testServiceClientService.send<number>('getItems', '')
    }


    async postItem(): Promise<Observable<number>> {
        return this.testServiceClientService.send<number>('postItem', '')
    }


    async getAlive(): Promise<Observable<string>> {
        return this.testServiceClientService.send<string>('alive', '')
    }
}