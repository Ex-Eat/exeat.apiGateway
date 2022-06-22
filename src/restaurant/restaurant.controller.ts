import { Controller, Get } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    @Get('alive')
    async getAlive() {
        // We should check if the user is connected
        return this.restaurantService.getAlive();
    }
}
