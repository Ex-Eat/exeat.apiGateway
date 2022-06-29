import {Body, Controller, Get, Post, Headers, Res, Req, UseGuards, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ICreateUserDto, IUserDto } from '../_dto/IUserDto';
import { lastValueFrom } from 'rxjs';
import { ITokenDto } from '../_dto/ITokenDto';
import { UnauthenticatedGuard } from './unauthenticated.guard';
import { AuthenticatedGuard } from './authenticated.guard';
import {HttpErrorsEnum} from "../_enums/http-errors.enum";

@Controller('auth')
export class AuthController {
	constructor(private _service: AuthService) {}

	@Get('user')
	@UseGuards(AuthenticatedGuard)
	async user(@Req() req): Promise<IUserDto> {
		const user = await lastValueFrom(this._service.getLoggedUser(req.cookies.access_token));
		if (typeof user === 'string') {
			return null;
		} else {
			const { sub, ...rest } = user;
			return rest;
		}
	}

	@Post('update')
	@UseGuards(AuthenticatedGuard)
	async update(@Req() req, @Res() res, @Body('data') data: string) {
		if (req.user.id != data['id']) {return UnauthorizedException}
		const tokens =  await lastValueFrom(this._service.update(data));
		res.cookie('access_token', tokens.accessToken, {
			httpOnly: true,
		})
			.cookie('refresh_token', tokens.refreshToken, {
				httpOnly: true,
			})
			.json(tokens.user)
			.send();

	}

	@Post('login')
	@UseGuards(UnauthenticatedGuard)
	async login(@Body('email') email: string,
                @Body('password') password: string,
                @Body('app') app: 'client' | 'deliverer' | 'restaurant',
                @Res({ passthrough: true }) res) {
		const tokens = await lastValueFrom<ITokenDto>(this._service.login(email, password));
        if (app && app === "client" && !tokens.user.isClient)
            throw new UnauthorizedException(HttpErrorsEnum.WRONG_APPLICATION);

		res.cookie('access_token', tokens.accessToken, {
			httpOnly: true,
		})
			.cookie('refresh_token', tokens.refreshToken, {
				httpOnly: true,
			})
			.json(tokens.user)
			.send();
	}



	@Get('logout')
	@UseGuards(AuthenticatedGuard)
	async logout(@Req() req, @Res() res) {
		await lastValueFrom(this._service.logout(req.cookies.refresh_token));
		res.clearCookie('access_token').clearCookie('refresh_token').json({ message: 'Successfully disconnected' });
	}

	@Post('signup')
	async signup(
		@Body() user: ICreateUserDto,
		@Res({ passthrough: true }) res,
	) {
		const tokens: ITokenDto = await lastValueFrom<ITokenDto>(this._service.signup(user));
		res.cookie('access_token', tokens.accessToken, {
			httpOnly: true,
		})
			.cookie('refresh_token', tokens.refreshToken, {
				httpOnly: true,
			})
			.json(tokens.user)
			.send();
	}

	@Get('alive')
	async getAlive(@Req() req) {
		return this._service.getAlive();
	}
}
