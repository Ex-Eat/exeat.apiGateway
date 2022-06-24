import { Controller, Get } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly _service: RestaurantService) {}

    @Get('alive')
    async getAlive() {
        // We should check if the user is connected
        return this._service.getAlive();
    }
}
