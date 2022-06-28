import {Body, Controller, Get, Param, Post, Headers, UseGuards, Put, Delete, Request, Query} from '@nestjs/common';
import {lastValueFrom, Observable} from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import {ICreateRestaurantDto, IRestaurantDto, IUpdateRestaurantDto} from 'src/_dto/IRestaurantDto';
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
	 * @param id string
	 * @returns {Promise<IRestaurantDto>}
	 */
	@Get('/:id')
	async getRestaurantById(@Param('id') id: string): Promise<IRestaurantDto> {
		return await lastValueFrom(this._service.getRestaurantById(id));
	}

	/**
	 * Creates a new restaurant in the database.
	 * To access this route you need to be authenticated.
	 * @param restaurant {name: string, address: string, phoneNumber: string, professionalEmail: string, description: string, termsOfUse: boolean, keywords: string[]}
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
	 * @param restaurant { name: string, address: string, phoneNumber: string, professionalEmail: string, description: string, keywords: string[]}
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

	// *************** ARTICLES ***************

	/**
	 * Creates a new article for a restaurant in the database.
	 * @param id The id of the restaurant
	 * @param article {name: string, description: string, price: number}
	 * @returns {Observable<string>}
	 */
	@Post(':id/article/create')
	@UseGuards(AuthenticatedGuard)
	async createArticle(@Body() article, @Param('id') id: string): Promise<string> {
		return await lastValueFrom(this._service.createArticle(id, article));
	}

	/**
	 * Get article from Id
	 * @param id The id of the article
	 * @returns {Promise<IRestaurantDto>}
	 */
	@Get('article/:id')
	async getArticleById(@Param('id') id: string) {
		return this._service.getArticleById(id);
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
	 * Update an article
	 * @param id The id of the article
	 * @param article {name: string, description: string, price: number}
	 * @returns {Observable<string>}
	 */
	@Put('article/:id')
	@UseGuards(AuthenticatedGuard)
	async updateArticle(@Param() params, @Body() data, @Headers('authorization') authorization: string) {
		return this._service.updateArticle(params.id, data);
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

	// ******************** MENUS ***********************

	/**
	 * Creates a new menu for a restaurant with included articles
	 * @param id The id of the restaurant
	 * @param menu {name: string, articles: string[], price: number}
	 * @returns {Observable<string>}
	 */
	@Post('/:id/menu/create')
	@UseGuards(AuthenticatedGuard)
	async createMenu(@Param() params, @Body() data, @Headers('authorization') authorization: string) {
		return this._service.createMenu(params.id, data, authorization);
	}

	/**
	 * Get all menus for a given restaurant
	 * @param id The id of the restaurant
	 * @returns {Observable<string>}
	 */
	@Get('/:id/menus')
	async getMenus(@Param() params) {
		return this._service.getMenus(params.id);
	}

	/**
	 * Get a menu by its id
	 * @param id The id of the menu
	 * @returns {Observable<string>}
	 */
	@Get('/menu/:id')
	async getMenuById(@Param() params) {
		return this._service.getMenuById(params.id);
	}

	/**
	 * Update a menu
	 * @param id The id of the menu
	 * @param menu {name: string, articles: string[], price: number}
	 * @returns {Observable<string>}
	 */
	@Put('/menu/:id')
	@UseGuards(AuthenticatedGuard)
	async updateMenu(@Param() params, @Body() data, @Headers('authorization') authorization: string) {
		return this._service.updateMenu(params.id, data, authorization);
	}

	/**
	 * Delete a menu
	 * @param id The id of the menu
	 * @returns {Observable<string>}
	 */
	@Delete('/menu/:id')
	@UseGuards(AuthenticatedGuard)
	async deleteMenu(@Param() params, @Headers('authorization') authorization: string) {
		return this._service.deleteMenu(params.id, authorization);
	}
}
