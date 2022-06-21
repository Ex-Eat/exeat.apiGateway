
import { Module } from '@nestjs/common';
import {ClientServiceController} from "./clientService.controller";
import {ClientServiceService} from "./clientService.service";

@Module({
    imports: [],
    controllers: [ClientServiceController],
    providers: [ClientServiceService],
})
export class ClientServiceModule {}
