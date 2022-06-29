import { Body, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { config } from '../config';
import {ICreateRestaurantDto, IRestaurantDto, IUpdateRestaurantDto} from 'src/_dto/IRestaurantDto';
import {CreateArticleDto, IArticleDto, UpdateArticleDto} from 'src/_dto/IArticleDto';
import {CreateMenuDto, IMenuDto} from 'src/_dto/IMenuDto';

@Injectable()
export class RestaurantService {
	private restaurantMS: ClientProxy;

	constructor() {
		this.restaurantMS = ClientProxyFactory.create({
			transport: Transport.TCP,
			options: {
				host: config.RESTAURANT_SERVICE_HOST,
				port: +config.RESTAURANT_SERVICE_PORT,
			},
		});
	}

	getAllRestaurant(): Observable<string> {
		return this.restaurantMS.send<string>({ cmd: 'restaurant/findall' }, '');
	}

	getRestaurantById(id: string): Observable<IRestaurantDto> {
		return this.restaurantMS.send<IRestaurantDto>({ cmd: 'restaurant/findone' }, { id });
	}

	async searchRestaurants(query: string): Promise<Observable<string>> {
		return this.restaurantMS.send<string>({ cmd: 'restaurant/search' }, { query });
	}

	async getRestaurantsOfUser(user: any): Promise<Observable<string>> {
		return this.restaurantMS.send<string>({ cmd: 'restaurant/findallbyuser' }, { user });
	}

	createRestaurant(restaurant: ICreateRestaurantDto, user: any): Observable<string> {
		return this.restaurantMS.send<string>({ cmd: 'restaurant/create' }, { restaurant, user });
	}

	updateRestaurant(
		id: number,
		restaurant: IUpdateRestaurantDto,
		authorization: string,
	): Observable<string> {
		return this.restaurantMS.send<string>({ cmd: 'restaurant/update' }, { id, restaurant, authorization });
	}

	deleteRestaurant(id: number, authorization: string): Observable<string> {
		return this.restaurantMS.send<string>({ cmd: 'restaurant/delete' }, { id, authorization });
	}

	// ********** Articles ************

	getArticles(restaurantId: string): Observable<IArticleDto[]> {
		return this.restaurantMS.send<IArticleDto[]>({ cmd: 'article/findallfromrestaurant' }, { restaurantId });
	}

	getArticleById(id: string): Observable<IArticleDto[]> {
		return this.restaurantMS.send<IArticleDto[]>({ cmd: 'article/findone' }, { id });
	}

	createArticle(restaurantId, article: CreateArticleDto): Observable<string> {
		return this.restaurantMS.send<string>({ cmd: 'article/create' }, { restaurantId, article });
	}

	updateArticle(id: string, article: UpdateArticleDto) {
		return this.restaurantMS.send<string>({ cmd: 'article/update' }, { id, article });
	}

	deleteArticle(id: number, authorization: string): Observable<string> {
		return this.restaurantMS.send<string>({ cmd: 'article/delete' }, { id, authorization });
	}

	getAlive(): Observable<string> {
		return this.restaurantMS.send<string>({ cmd: 'alive' }, '');
	}

	// ********** Menus ************

	createMenu(restaurantId: string, menu: CreateMenuDto, authorization: string): Observable<string> {
		return this.restaurantMS.send<string>({ cmd: 'menu/create' }, { restaurantId, menu });
	}

	getMenus(restaurantId: string): Observable<IMenuDto[]> {
		return this.restaurantMS.send<IMenuDto[]>({ cmd: 'menu/findallfromrestaurant' }, { restaurantId });
	}

	getMenuById(id: string): Observable<string> {
		return this.restaurantMS.send<string>({ cmd: 'menu/findone' }, { id });
	}

	updateMenu(id: string, menu: CreateMenuDto, authorization: string): Observable<string> {
		return this.restaurantMS.send<string>({ cmd: 'menu/update' }, { id, menu });
	}

	deleteMenu(id: string, authorization: string): Observable<string> {
		return this.restaurantMS.send<string>({ cmd: 'menu/delete' }, { id });
	}
}
