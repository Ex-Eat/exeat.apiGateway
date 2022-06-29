import {IRestaurantDto} from "./IRestaurantDto";
import {IArticleDto} from "./IArticleDto";

export interface IMenuDto {
	_id: string;
	name: string;
	menuImage: string;
	price: number;
	articles: IArticleDto[];
	restaurantId: IRestaurantDto;
}

export interface CreateMenuDto {
	name: string;
	articles: string[];
	price: number;
}
