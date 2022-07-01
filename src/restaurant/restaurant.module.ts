import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

@Module({
	imports: [],
	controllers: [RestaurantController],
	providers: [RestaurantService, AuthService],
})
export class RestaurantModule {}
