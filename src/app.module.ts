import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from "./restaurant/restaurant.module";
import {DeliverModule} from "./deliver/deliver.module";
import { OrderModule } from './order/order.module';

@Module({
	imports: [TestModule, ClientModule, AuthModule, RestaurantModule, DeliverModule, OrderModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
