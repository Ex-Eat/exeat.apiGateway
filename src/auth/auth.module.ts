import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import {config} from "../config";

@Module({
    imports: [
        JwtModule.register({
            secret: config.SECRET_KEY,
            signOptions: {
                expiresIn: config.TOKEN_EXPIRATION,
            }
        }),

    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {
}
