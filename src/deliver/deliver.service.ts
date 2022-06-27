import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { config } from '../config';

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

    async createDeliver(): Promise<Observable<string>> {
        return this.deliverMS.send<string>({cmd: 'createDeliver'}, JSON.stringify(deliverObject));
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
}
