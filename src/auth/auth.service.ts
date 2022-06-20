import {Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {JwtPayload} from "./auth.interface";

@Injectable()
export class AuthService {

    constructor(private _jwtService: JwtService) {
    }

    verifyToken(token: string): string | JwtPayload | object  {
        let action: string | JwtPayload | object = 'reject';
        try {
            action = this._jwtService.verify(token)
        } catch (e: any) {
            if (e.name === 'TokenExpiredError') {
                action = 'renew'
            } else {
                action = 'reject'
            }
        }
        return action;
    }

}
