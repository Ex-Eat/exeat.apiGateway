import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { config } from '../config';
import { Observable } from 'rxjs';
import { ICreateUserDto } from '../_dto/IUserDto';
import { ITokenDto } from '../_dto/ITokenDto';

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

	signup(user: ICreateUserDto, authorization: string): Observable<ITokenDto> {
		return this.authMS.send<ITokenDto>(
			{ cmd: 'user/create' },
			{
				user,
				authorization,
			},
		);
	}

	isLoggedIn(accessToken: string): Observable<boolean> {
		return this.authMS.send<boolean>({ cmd: 'auth/isLoggedIn' }, { accessToken });
	}

	getLoggedUser(accessToken: string): Observable<object> {
		return this.authMS.send<object>({ cmd: 'auth/getLoggedUser' }, { accessToken });
	}


	async getAlive(): Promise<Observable<string>> {
		return this.authMS.send<string>({ cmd: 'alive' }, '');
	}
}
