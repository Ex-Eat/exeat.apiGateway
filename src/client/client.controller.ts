import { Body, Controller, Get, Param, Post, Headers, UseGuards, Put, Delete, Request } from '@nestjs/common';
import { ClientService } from './client.service';
import { ICreateClientDto, IUpdateClientDto } from 'src/_dto/IClientDto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Client')
@Controller('client')
export class ClientController {
	constructor(private readonly _service: ClientService) {}

	@Get('/alive')
	async getAlive() {
		// We should check if the user is connected
		return this._service.getAlive();
	}

	@Get('/getAllUsers')
	async findAll() {
		// We should check if the user is connected
		return this._service.getAll();
	}

	@Get('/:id')
	async getClientById(@Param() param) {
		return this._service.getClientById(param.id);
	}

	@Get('/global/:id')
	async getClientByGlobalId(@Param('id') id: number) {
		return this._service.getClientByGlobalId(id);
	}

	@Post('/createUser')
	async create(@Body() client: ICreateClientDto, @Request() req) {
		// We should check if the user is connected
		return this._service.create(client);
	}

	@Put('/:id')
	async update(@Param() param, @Body() client: IUpdateClientDto) {
		// We should check if the user is connected
		return this._service.updateClient(param.id, client);
	}

	@Delete('/:id')
	async deleteClient(@Param() param) {
		return this._service.deleteClient(param.id);
	}
}
