import { ObjectId } from "mongoose";

/**
 * This will used as database connection args type.
 */
export interface DatabaseConnectionArgs {
    url: string;
}

/**
 * Interface for user model
 */
export interface IUser {
    _id: ObjectId
    name: string;
    username: string;
    email: string;
    token: string | null;
    password: string;
}

/**
 * Inerface for Vehicle resource
 */
export interface IVehicle {
    _id: string;
    user: ObjectId
    name: string;
    maxSpeed: string;
    color: string;
    price: string;
    model: string;
}

export interface IPayload {
    _id: string;
    email: string;
    username: string;
}

export interface ISearchQuery {
    user: string,
    createdAt?: any,
    color?: string | undefined | null
    model?: string | undefined | null
    $or?: any,
}

export interface IVehicleSearchArgs {
    query: any;
    sortKey: string | null;
    sortValue: number;
    limit: number;
    skip: number;
}