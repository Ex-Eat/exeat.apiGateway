import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TestServiceModule} from "./testService/testService.module";

@Module({
    imports: [
        TestServiceModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
