import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { config } from '../config';
import {IDeliver} from "./deliver.controller";

@Injectable()
export class DeliverService {
    private deliverMS: ClientProxy;

    constructor() {
        this.deliverMS = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: config.DELIVER_SERVICE_HOST,
                port: +config.DELIVER_SERVICE_PORT,
            },
        });
    }

    async getAlive(): Promise<Observable<string>> {
        return this.deliverMS.send<string>({cmd: 'alive'}, '');
    }

    // CRUD DELIVER

    async createDeliver(data: IDeliver): Promise<Observable<string>> {
        return this.deliverMS.send<string>({cmd: 'createDeliver'}, JSON.stringify(data));
    }

    async getDeliver(globalUserId: number): Promise<Observable<string>> {
        let data = {
            globalUserId: globalUserId
        }
        return this.deliverMS.send<string>({cmd: 'getDeliver'}, JSON.stringify(data));
    }

    async updateDeliver(globalUserId: number, update): Promise<Observable<string>> {
        let data = {
            filter: { globalUserId: globalUserId },
            update: update
        }

        return this.deliverMS.send<string>({cmd: 'updateDeliver'}, JSON.stringify(data));
    }

    async deleteDeliver(globalUserId: number): Promise<Observable<string>> {
        let data = {
            globalUserId: globalUserId
        }

        return this.deliverMS.send<string>({cmd: 'deleteDeliver'}, JSON.stringify(data));
    }

    // GEOCODING

    async geocoding(data: string): Promise<Observable<string>> {
        return this.deliverMS.send<string>({cmd: 'geocoding'}, JSON.stringify(data));
    }
}
