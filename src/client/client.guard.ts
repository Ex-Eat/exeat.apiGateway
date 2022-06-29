import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class DeliverGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        return request.user.isClient === true;
    }
}
