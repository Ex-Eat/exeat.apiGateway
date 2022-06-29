import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { config } from '../config';
import { Observable } from 'rxjs';
import { ICreateUserDto, IUserDto } from '../_dto/IUserDto';
import { ITokenDto } from '../_dto/ITokenDto';
import { JwtPayload } from '../_dto/JwtPayload';
import { Jwt } from 'jsonwebtoken';

@Injectable()
export class AuthService {
	private authMS: ClientProxy;

	constructor() {
		this.authMS = ClientProxyFactory.create({
			transport: Transport.TCP,
			options: {
				host: config.AUTH_SERVICE_HOST,
				port: +config.AUTH_SERVICE_PORT,
			},
		});
	}

	login(email: string, password: string): Observable<ITokenDto> {
		return this.authMS.send<ITokenDto>(
			{ cmd: 'auth/login' },
			{
				email,
				password,
			},
		);
	}

	logout(refreshToken: string): Observable<ITokenDto> {
		return this.authMS.send<ITokenDto>(
			{ cmd: 'auth/logout' },
			{
				refreshToken,
			},
		);
	}

	signup(user: ICreateUserDto): Observable<ITokenDto> {
		return this.authMS.send<ITokenDto>(
			{ cmd: 'user/create' },
			{
				user,
			},
		);
	}

	update(data: any): Observable<ITokenDto> {
		return this.authMS.send<ITokenDto>({ cmd: 'user/update' }, data);
	}

	isLoggedIn(accessToken: string): Observable<boolean> {
		return this.authMS.send<boolean>({ cmd: 'auth/isLoggedIn' }, { accessToken });
	}

	getLoggedUser(accessToken: string): Observable<(IUserDto & { sub: number }) | string> {
		return this.authMS.send<JwtPayload | string>({ cmd: 'auth/getLoggedUser' }, { accessToken });
	}

	refreshToken(accessToken: string, refreshToken: string): Observable<ITokenDto> {
		return this.authMS.send<ITokenDto>({ cmd: 'auth/refreshToken' }, { accessToken, refreshToken });
	}

	getAlive(): Observable<string> {
		return this.authMS.send<string>({ cmd: 'alive' }, '');
	}
}
