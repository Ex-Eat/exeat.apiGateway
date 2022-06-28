import {IRestaurantDto} from "./IRestaurantDto";
import {IMenuDto} from "./IMenuDto";

export interface IArticleDto {
	_id: string;
	name: string;
	description: string;
	articleImage: string;
	price: number;
	restaurantId: IRestaurantDto;
	menus: IMenuDto[];
}

export interface CreateArticleDto {
	title: string;
	description: string;
	price: number;
}

export interface UpdateArticleDto {
	title: string;
	description: string;
	price: number;
}
