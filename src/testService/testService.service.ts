import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import {Observable} from "rxjs";

@Injectable()
export class TestServiceService {
    private testServiceClientService: ClientProxy

    constructor() {
        this.testServiceClientService = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: '127.0.0.1',
                port: 8123
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
}