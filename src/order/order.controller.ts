import {Controller, Get, Post, Put} from '@nestjs/common';
import {OrderService} from "./order.service";
import {lastValueFrom} from "rxjs";
import {ICreateOrderDto, IOrderDto, IOrderSearchDto, IUpdateOrderDto} from "./order.dto";

@Controller('order')
export class OrderController {

    constructor(private _service: OrderService) {
    }

    @Get()
    async orders(search?: IOrderSearchDto): Promise<IOrderDto[]> {
        return await lastValueFrom(this._service.findAll(search));
    }

    @Get('/:id')
    async order(id: string): Promise<IOrderDto> {
        return await lastValueFrom(this._service.findOne(id));
    }

    @Post()
    async create(data: ICreateOrderDto) {
        return this._service.create(data);
    }

    @Put()
    async update(data: IUpdateOrderDto) {
        return this._service.update(data);
    }

}
