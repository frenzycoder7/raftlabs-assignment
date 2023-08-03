import { IPayload, IUser } from "@interface";
import { createUserService, getUserService, updateUserService } from "@services";
import { comparePassword, hashPassword, signToken } from "@utils";
import { Request, Response } from "express";

export const createUserLogic = async (req: Request, res: Response) => {
    try {
        let data: IUser = req.body;
        data.password = await hashPassword(data.password);
        let user: IUser = await createUserService(data);
        res.status(201).send({
            message: 'user created',
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
        })
    }
}

export const loginUserLogic = async (req: Request, res: Response) => {
    try {
        let { username, password } = req.body;
        let user: IUser[] | null = await getUserService({ $or: [{ username }, { email: username }] });
        if (user == null || user.length == 0) throw Error('User not found with id' + username);
        let data: IUser = user[0];

        let isValid: Boolean = await comparePassword(password, data.password);

        if (!isValid) throw Error('Invalid Password');

        let payload: IPayload = {
            _id: data._id.toString(),
            username: data.username,
            email: data.email,
        }

        let token = await signToken(payload);

        data.token = token;
        await updateUserService({ _id: data._id }, data);
        res.status(200).send({
            message: 'user logged in',
            data: {
                token: token,
                user: {
                    _id: data._id,
                    username: data.username,
                    email: data.email,
                    name: data.name,
                }
            }
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
        })
    }
}

export const getUserProfileLogic = async (req: Request, res: Response) => {
    res.status(200).send({
        user: req.user,
    });
}

export const logoutUserLogic = async (req: Request, res: Response) => {
    try {
        let user: any = req.user;
        user.token = null;
        console.log(user)
        let data = await updateUserService({ _id: req.user._id }, user);
        res.status(200).send({
            message: 'user logged out',
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
        })
    }
}