import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {ClientModule} from "../client/client.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [ClientModule, AuthModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
