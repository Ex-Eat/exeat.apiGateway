export interface ILocationDto {
	address: string;
	lat: number;
	lng: number;
}

export interface IDeliverDto {
	globalUserId: number;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	birthDate: Date;
	termsOfUse: boolean;
	location: Location;
	patronageCode: string;
	notification: boolean;
	movingRadius: number;
}
