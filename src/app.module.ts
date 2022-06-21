import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TestServiceModule} from "./testService/testService.module";
import {ClientServiceModule} from "./clientService/clientService.module";

@Module({
    imports: [
        TestServiceModule,
        ClientServiceModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
