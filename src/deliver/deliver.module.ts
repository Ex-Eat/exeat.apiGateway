import { Module } from '@nestjs/common';
import { DeliverController } from './deliver.controller';
import { DeliverService } from './deliver.service';

@Module({
    imports: [],
    controllers: [DeliverController],
    providers: [DeliverService],
})
export class DeliverModule {}
