import { RolesTypeEnum } from '../_enums/roles-type.enum';

export interface ICreateUserDto {
	username: string;
	email: string;
	password: string;
	cguAccepted: boolean;
	birthDate: Date;
	confirmPassword: string;
}

export interface IUserDto {
	id: number;
	username: string;
	email: string;
	role: RolesTypeEnum;
	birthDate: Date;
	isClient: boolean;
	isDev: boolean;
	isRestaurant: boolean;
	isDeliverer: boolean;
	createdAt: Date;
}
