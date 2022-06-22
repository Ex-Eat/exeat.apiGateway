import { RolesTypeEnum } from '../_enums/roles-type-enum';

export interface JwtPayload {
	sub: number;
	id: number;
	email: string;
	username: string;
	role: RolesTypeEnum;
	createdAt: Date;
	isDev: boolean;
	isRestaurant: boolean;
	isDeliverer: boolean;
	isClient: boolean;
}
