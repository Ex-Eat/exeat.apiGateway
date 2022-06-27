import { Body, Controller, Get, Param, Post, Headers, UseGuards, Put, Delete, Request } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ICreateRestaurantDto, IUpdateRestaurantDto } from 'src/_dto/IRestaurantDto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
	constructor(private _service: RestaurantService, private _authService: AuthService) {}

	/**
	 * Returns all the restaurants in the database
	 * @returns {Observable<string>}
	 */
	@Get('')
	async getAllRestaurant() {
		return this._service.getAllRestaurant();
	}

	/**
	 * Returns the restaurants of the user
	 * @param req
	 * @returns {Observable<string>}
	 */
	@UseGuards(AuthenticatedGuard)
	@Get('/owned')
	async getRestaurants(@Request() req) {
		const user = await lastValueFrom(this._authService.getLoggedUser(req.cookies.access_token));
		return this._service.getRestaurantsOfUser(user);
	}

	/**
	 * Returns a restaurant by its id
	 * @param params {id}
	 * @returns {Observable<string>}
	 */
	@Get('/:id')
	async getRestaurantById(@Param() params) {
		return this._service.getRestaurantById(params.id);
	}

	/**
	 * Creates a new restaurant in the database.
	 * To access this route you need to be authenticated.
	 * @param restaurant {name: string, address: string, phone_number: string, professional_email: string, description: string, terms_of_use: boolean, keywords: string[]}
	 * @returns restaurant
	 */
	@Post('/create') // TODO: Add the ownerID to the restaurant
	@UseGuards(AuthenticatedGuard) // TODO: Add a guard to check if the user is a restaurator
	async createRestaurant(@Body() restaurant: ICreateRestaurantDto, @Request() req) {
		const user = await lastValueFrom(this._authService.getLoggedUser(req.cookies.access_token));

		return this._service.createRestaurant(restaurant, user);
	}

	/**
	 * Updates a restaurant in the database.
	 * To access this route you need to be authenticated.
	 * @param id
	 * @param restaurant { name: string, address: string, phone_number: string, professional_email: string, description: string, keywords: string[]}
	 * @returns restaurant
	 */
	@Put('/:id')
	@UseGuards(AuthenticatedGuard) // TODO: Add a guard to check if the user is a restaurator
	async updateRestaurant(
		@Param() params,
		@Body() restaurant: IUpdateRestaurantDto,
		@Headers('authorization') authorization: string,
	) {
		return this._service.updateRestaurant(params.id, restaurant, authorization);
	}

	/**
	 * Deletes a restaurant from the database.
	 * @param id The id of the restaurant to delete
	 * @returns restaurant
	 */
	@Delete('/:id')
	@UseGuards(AuthenticatedGuard) // TODO: Add a guard to check if the user is a restaurator and if the restaurant is owned by the user
	async deleteRestaurant(@Param() params, @Headers('authorization') authorization: string) {
		return this._service.deleteRestaurant(params.id, authorization);
	}

	/**
	 * Creates a new article for a restaurant in the database.
	 * @param id The id of the restaurant
	 * @param article {name: string, description: string, price: number}
	 * @returns {Observable<string>}
	 */
	@Post(':id/article/create')
	@UseGuards(AuthenticatedGuard)
	async createArticle(@Body() data, @Param() params) {
		return this._service.createArticle(data, params.id);
	}

	/**
	 * Get all articles of a restaurant
	 * @param id The id of the restaurant
	 * @returns {Observable<string>}
	 */
	@Get('/:id/articles')
	async getArticles(@Param() params) {
		return this._service.getArticles(params.id);
	}

	/**
	 * Deletes an article
	 * @param id The id of the article
	 * @returns {Observable<string>}
	 */
	@Delete('article/:id')
	@UseGuards(AuthenticatedGuard)
	async deleteArticle(@Param() params, @Headers('authorization') authorization: string) {
		return this._service.deleteArticle(params.id, authorization);
	}

	@Get('alive')
	async getAlive() {
		// We should check if the user is connected
		return this._service.getAlive();
	}
}
