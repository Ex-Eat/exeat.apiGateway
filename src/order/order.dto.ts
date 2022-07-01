import {OrderStatusEnum} from "./order-status.enum";
import {IMenuDto} from "../_dto/IMenuDto";
import {IArticleDto} from "../_dto/IArticleDto";
import {IRestaurantDto} from "../_dto/IRestaurantDto";
import {IClientDto} from "../_dto/IClientDto";
import {IDeliverDto} from "../_dto/IDeliverDto";

export interface IOrderDto {
    _id: string;
    restaurant: IRestaurantDto;
    client: IClientDto;
    deliver: IDeliverDto;
    status: OrderStatusEnum;
    articles: IArticleDto[];
    menus: IMenuDto[];
    location: {
        lat: number;
        lng: number;
        address: string;
    };
    clientComment: string;
    deliverComment: string;
    restaurantComment: string;
    restaurantPrice: number;
    delivererFee: number;
    appFee: number;
}

export interface IOrderSearchDto {
    _id?: string;
    restaurant?: string;
    client?: string;
    deliver?: string;
    status?: OrderStatusEnum;
}

export interface ICreateOrderDto {
    _id: string;
    restaurant: IRestaurantDto;
    client: IClientDto;
    articles: IArticleDto[];
    menus: IMenuDto[];
    location: {
        lat: number;
        lng: number;
        address: string;
    };
    clientComment: string;
    restaurantPrice: number;
    delivererFee: number;
    appFee: number;
}

export interface IUpdateOrderDto {
    _id: string;
    deliver?: IDeliverDto;
    status: OrderStatusEnum;
    deliverComment: string;
    restaurantComment: string;
}