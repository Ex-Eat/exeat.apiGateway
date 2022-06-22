import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpErrorsEnum } from '../_enums/http-errors-enum';
import { AuthService } from './auth.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
	constructor(private _service: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		if (!request.cookies.access_token) {
			return false;
		}
		request.user = await this.validateToken(request.cookies.access_token);
		return true;
	}

	async validateToken(token: string) {
		try {
			return await this._service.getLoggedUser(token);
		} catch (e: any) {
			if (e.name === 'TokenExpiredError') {
				throw new UnauthorizedException(HttpErrorsEnum.TOKEN_EXPIRED_REFRESH_NEEDED);
			} else {
				throw new UnauthorizedException(HttpErrorsEnum.INVALID_TOKEN);
			}
		}
	}
}
