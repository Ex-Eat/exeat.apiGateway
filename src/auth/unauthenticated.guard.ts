import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UnauthenticatedGuard implements CanActivate {
	constructor(private _authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		return !(await lastValueFrom<boolean>(this._authService.isLoggedIn(request.cookies.access_token)));
	}
}
