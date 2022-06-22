import { Injectable } from '@nestjs/common';
import {
    ClientProxy,
    ClientProxyFactory,
    Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { config } from '../config';

@Injectable()
export class RestaurantService {
    private restaurantMS: ClientProxy;

    constructor() {
        this.restaurantMS = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: config.RESTAURANT_SERVICE_HOST,
                port: +config.RESTAURANT_SERVICE_PORT,
            },
        });
    }

    async getAlive(): Promise<Observable<string>> {
        return this.restaurantMS.send<string>({ cmd: 'alive' }, '');
    }
}
