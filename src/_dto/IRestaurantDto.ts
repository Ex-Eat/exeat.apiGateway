import {IMenuDto} from "./IMenuDto";
import {IArticleDto} from "./IArticleDto";

export interface IRestaurantDto {
	_id: string;
	globalUserId: number;
	name: string;
	description: string;
	keywords: string[];
	professionalMail: string;
	phoneNumber: string;
	termsOfUse: boolean;
	location: {
		lat: number;
		lng: number;
		address: string;
	};
	patronageCode: string;
	notification: boolean;
	restaurantImage: string;
	menus: IMenuDto[];
	articles: IArticleDto[];
}

export interface ICreateRestaurantDto {
	name: string;
	address: string;
	phone: string;
	professionalEmail: string;
	keywords: string[];
	description: string;
	termsOfUse: boolean;
}

export interface IUpdateRestaurantDto {
	name: string;
	address: string;
	phone: string;
	professionalEmail: string;
	keywords: string[];
	description: string;
}
