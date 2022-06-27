import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from "./restaurant/restaurant.module";
import {DeliverModule} from "./deliver/deliver.module";

@Module({
	imports: [TestModule, ClientModule, AuthModule, RestaurantModule, DeliverModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
