import { Body, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { config } from '../config';
import { ICreateRestaurantDto, IUpdateRestaurantDto } from 'src/_dto/IRestaurantDto';
import { CreateArticleDto, UpdateArticleDto } from 'src/_dto/IArticleDto';
import { CreateMenuDto } from 'src/_dto/IMenuDto';

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

	async getAllRestaurant(): Promise<Observable<string>> {
		return this.restaurantMS.send<string>({ cmd: 'restaurant/findall' }, '');
	}

	async getRestaurantById(id: number): Promise<Observable<string>> {
		return this.restaurantMS.send<string>({ cmd: 'restaurant/findone' }, { id });
	}

	async getRestaurantsOfUser(user: any): Promise<Observable<string>> {
		console.log(user);
		return this.restaurantMS.send<string>({ cmd: 'restaurant/findallbyuser' }, { user });
	}

	async createRestaurant(restaurant: ICreateRestaurantDto, user: any): Promise<Observable<string>> {
		return this.restaurantMS.send<string>({ cmd: 'restaurant/create' }, { restaurant, user });
	}

	async updateRestaurant(
		id: number,
		restaurant: IUpdateRestaurantDto,
		authorization: string,
	): Promise<Observable<string>> {
		return this.restaurantMS.send<string>({ cmd: 'restaurant/update' }, { id, restaurant, authorization });
	}

	async deleteRestaurant(id: number, authorization: string): Promise<Observable<string>> {
		return this.restaurantMS.send<string>({ cmd: 'restaurant/delete' }, { id, authorization });
	}

	// ********** Articles ************

	async getArticles(id: string): Promise<Observable<string>> {
		return this.restaurantMS.send<string>({ cmd: 'article/findallfromrestaurant' }, { id });
	}

	async getArticleById(id: string): Promise<Observable<string>> {
		return this.restaurantMS.send<string>({ cmd: 'article/findone' }, { id });
	}

	async createArticle(restaurantId, article: CreateArticleDto): Promise<Observable<string>> {
		console.log(restaurantId);
		return this.restaurantMS.send<string>({ cmd: 'article/create' }, { restaurantId, article });
	}

	async updateArticle(id: string, article: UpdateArticleDto) {
		return this.restaurantMS.send<string>({ cmd: 'article/update' }, { id, article });
	}

	async deleteArticle(id: number, authorization: string): Promise<Observable<string>> {
		return this.restaurantMS.send<string>({ cmd: 'article/delete' }, { id, authorization });
	}

	async getAlive(): Promise<Observable<string>> {
		return this.restaurantMS.send<string>({ cmd: 'alive' }, '');
	}

	// ********** Menus ************

	async createMenu(restaurantId: string, menu: CreateMenuDto, authorization: string): Promise<Observable<string>> {
		return this.restaurantMS.send<string>({ cmd: 'menu/create' }, { restaurantId, menu });
	}

	async getMenus(restaurantId: string): Promise<Observable<string>> {
		return this.restaurantMS.send<string>({ cmd: 'menu/findallfromrestaurant' }, { restaurantId });
	}

	async getMenuById(id: string): Promise<Observable<string>> {
		return this.restaurantMS.send<string>({ cmd: 'menu/findone' }, { id });
	}

	async updateMenu(id: string, menu: CreateMenuDto, authorization: string): Promise<Observable<string>> {
		return this.restaurantMS.send<string>({ cmd: 'menu/update' }, { id, menu });
	}

	async deleteMenu(id: string, authorization: string): Promise<Observable<string>> {
		return this.restaurantMS.send<string>({ cmd: 'menu/delete' }, { id });
	}
}
