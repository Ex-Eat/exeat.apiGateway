import { Body, Controller, Get, Post, Headers, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ICreateUserDto } from '../_dto/IUserDto';
import { lastValueFrom } from 'rxjs';
import { ITokenDto } from '../_dto/ITokenDto';
import { UnauthenticatedGuard } from './unauthenticated.guard';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('auth')
export class AuthController {
	constructor(private _service: AuthService) {}

	@Post('login')
	@UseGuards(UnauthenticatedGuard)
	async login(@Body('email') email: string, @Body('password') password: string, @Res({ passthrough: true }) res) {
		const tokens = await lastValueFrom<ITokenDto>(this._service.login(email, password));
		res.cookie('access_token', tokens.accessToken, {
			httpOnly: true,
		})
			.cookie('refresh_token', tokens.refreshToken, {
				httpOnly: true,
			})
			.json({ message: 'Successfully authenticated' })
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
		@Headers('authorization') authorization: string,
		@Res({ passthrough: true }) res,
	): Promise<Partial<ITokenDto>> {
		const tokens: ITokenDto = await lastValueFrom<ITokenDto>(this._service.signup(user, authorization));
		res.cookie('access_token', tokens.accessToken, {
			httpOnly: true,
		});
		res.cookie('refresh_token', tokens.refreshToken, {
			httpOnly: true,
		});
		return res.json({ message: 'Successfully authenticated' });
	}

	@Get('alive')
	async getAlive(@Req() req) {
		return this._service.getAlive();
	}
}
