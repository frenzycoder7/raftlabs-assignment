import { redisClient } from "@connection";
import { IPayload, IUser } from "@interface";
import { getUserService } from "@services";
import { verifyToken } from "@utils";
import { NextFunction, Request, Response } from "express";

export const authenticateUser = (redisRef: Boolean) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token: string | any = req.headers.authorization;
            if (!token)
                throw Error('Missing token in request headers');

            let payload: IPayload = await verifyToken(token);
            let redisData: string | null = await redisClient.get(`${payload._id}`);

            if (redisData) console.log('Redis Data: for Authentication ');

            let user: IUser[] | null = redisData != null ? [JSON.parse(redisData)] : await getUserService({ _id: payload._id, token: token });


            if (!user || user.length == 0)
                throw Error('Invalid token');

            if (redisData == null) redisClient.set(`${payload._id}`, JSON.stringify(user[0]), 'EX', 60 * 2);

            req.user = user[0];
            if (redisRef == true) {
                await redisClient.del(`${user[0]._id}`);
            }
            next();
        } catch (error) {
            res.status(500).send({
                message: error.message,
            })
        }
    }
}