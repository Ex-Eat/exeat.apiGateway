import { Injectable } from '@nestjs/common';
import {ClientProxy, ClientProxyFactory, Transport} from "@nestjs/microservices";
import {config} from "../config";
import {Observable} from "rxjs";
import {ICreateOrderDto, IOrderDto, IOrderSearchDto, IUpdateOrderDto} from "./order.dto";

@Injectable()
export class OrderService {

    private orderMS: ClientProxy;

    constructor() {
        this.orderMS = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: config.ORDER_SERVICE_HOST,
                port: +config.ORDER_SERVICE_PORT,
            },
        });
    }

    findAll(search: IOrderSearchDto): Observable<IOrderDto[]> {
        return this.orderMS.send<IOrderDto[]>({cmd: 'order/all'}, search);
    }

    findOne(id: string): Observable<IOrderDto> {
        return this.orderMS.send<IOrderDto>({ cmd: 'order/one' }, id)
    }

    create(data: ICreateOrderDto): Observable<IOrderDto> {
        return this.orderMS.send<IOrderDto>({ cmd: 'order/create' }, data)
    }

    update(data: IUpdateOrderDto): Observable<IOrderDto> {
        return this.orderMS.send<IOrderDto>({ cmd: 'order/update' }, data)
    }

}
