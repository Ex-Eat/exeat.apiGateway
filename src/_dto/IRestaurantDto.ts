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
