import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import {Observable} from "rxjs";
import {config} from "../config";

@Injectable()
export class ClientServiceService {
    private clientServiceClientService: ClientProxy

    constructor() {
        this.clientServiceClientService = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: config.CLIENT_SERVICE_HOST,
                port: +config.CLIENT_SERVICE_PORT
            }
        })
    }

    async getAlive(): Promise<Observable<string>> {
        return this.clientServiceClientService.send<string>('alive', '')
    }
}