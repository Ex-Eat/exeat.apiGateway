
import { Module } from '@nestjs/common';
import { TestServiceController } from './testService.controller';
import { TestServiceService } from './testService.service';

@Module({
    imports: [],
    controllers: [TestServiceController],
    providers: [TestServiceService],
})
export class TestServiceModule {}
