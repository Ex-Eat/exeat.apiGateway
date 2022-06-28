import { Module } from '@nestjs/common';
import { DeliverController } from './deliver.controller';
import { DeliverService } from './deliver.service';
import {AuthService} from "../auth/auth.service";

@Module({
    imports: [],
    controllers: [DeliverController],
    providers: [DeliverService, AuthService],
})
export class DeliverModule {}
