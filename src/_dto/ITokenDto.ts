import {IUserDto} from "./IUserDto";

export interface ITokenDto {
	user?: IUserDto;
	accessToken: string;
	refreshToken: string;
}
