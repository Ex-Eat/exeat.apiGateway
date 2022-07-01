export interface IClientDto {
    _id: string;
    globalUserId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    termsOfUse: boolean;
    locations: {
        lat: number;
        lng: number;
        address: string;
    };
    patronageCode: string;
    notification: boolean;
}

export interface ICreateClientDto {
	globalUserId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    termsOfUse: boolean;
    locations: {lat: number, lng: number, address: string};
    patronageCode: string;
    notification: boolean;
}

export interface IUpdateClientDto {
	firstName: string;
    lastName: string;
    phoneNumber: string;
    locations: {lat: number, lng: number, address: string};
    notification: boolean;
}