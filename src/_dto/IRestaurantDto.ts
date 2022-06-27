export interface ICreateRestaurantDto {
	name: string;
	address: string;
	phone: string;
	professionalEmail: string;
	keywords: string[];
	description: string;
	terms_of_use: boolean;
}

export interface IUpdateRestaurantDto {
	name: string;
	address: string;
	phone: string;
	professionalEmail: string;
	keywords: string[];
	description: string;
}
