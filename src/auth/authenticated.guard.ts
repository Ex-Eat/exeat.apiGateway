import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpErrorsEnum } from '../_enums/http-errors.enum';
import { AuthService } from './auth.service';
import { JwtPayload } from '../_dto/JwtPayload';
import { lastValueFrom } from 'rxjs';
import { ITokenDto } from '../_dto/ITokenDto';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(private _service: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        if (!request.cookies.access_token) {
            return false;
        }
        const validateResponse = await this.validateToken(request.cookies.access_token, request.cookies.refresh_token);

        if (typeof validateResponse === 'string') {
            return false;
        } else if ('accessToken' in validateResponse) {
            request.user = validateResponse.accessToken;
            response.cookie('access_token', validateResponse.accessToken);
        } else {
            request.user = validateResponse;
        }
        return true;
    }

    async validateToken(accessToken: string, refreshToken: string): Promise<JwtPayload | ITokenDto | string> {
        try {
            return await lastValueFrom(this._service.getLoggedUser(accessToken));
        } catch (e: any) {
            if (e.message === HttpErrorsEnum.TOKEN_EXPIRED_REFRESH_NEEDED) {
                return await lastValueFrom(this._service.refreshToken(accessToken, refreshToken));
            } else {
                throw new UnauthorizedException(HttpErrorsEnum.INVALID_TOKEN);
            }
        }
    }
}
