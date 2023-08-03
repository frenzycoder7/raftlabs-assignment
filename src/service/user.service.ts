import { IUser } from "@interface";
import { UserModel } from "@models";

export const createUserService = async (data: IUser) => {
    let user: IUser = await UserModel.create(data);
    return user;
}

export const getUserService = async (query: any): Promise<IUser[] | null> => {
    
    let user: IUser[] | null = await UserModel.find(query);
    return user;
}

export const updateUserService = async (query: any, data: IUser): Promise<IUser | null> => {
    let user: IUser | null = await UserModel.findOneAndUpdate(query, data, { new: true });
    return user;
}