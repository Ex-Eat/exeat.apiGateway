import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    Post,
    Put,
    Req,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import {OrderService} from "./order.service";
import {lastValueFrom} from "rxjs";
import {ICreateOrderDto, IOrderDto, IOrderSearchDto, IUpdateOrderDto} from "./order.dto";
import {AuthenticatedGuard} from "../auth/authenticated.guard";
import {ClientGuard} from "../client/client.guard";
import {ClientService} from "../client/client.service";

@Controller('order')
export class OrderController {

    constructor(private _service: OrderService,
                private _clientService: ClientService) {
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
    @UseGuards(AuthenticatedGuard, ClientGuard)
    async create(@Body() data: ICreateOrderDto, @Req() req) {
        if (typeof req.user !== "string") {
            const client = await lastValueFrom(this._clientService.getClientByGlobalId(req.user.id));
            return this._service.create(data, client);
        }
        throw new ForbiddenException();
    }

    @Put()
    async update(data: IUpdateOrderDto) {
        return this._service.update(data);
    }

}
