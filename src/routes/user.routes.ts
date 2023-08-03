import { createUserLogic, getUserProfileLogic, loginUserLogic, logoutUserLogic } from "@logic";
import { authenticateUser, checkrequiredbody, checkrequiredheaders, filterRequiredKeys } from "@middlewares";
import { userStructure } from "@models";
import { IRouter, Router } from "express";

export const user_router: IRouter = Router();

user_router.post(
    '/',
    checkrequiredbody(filterRequiredKeys(userStructure)),
    createUserLogic,
);

user_router.post(
    '/login',
    checkrequiredbody(['username', 'password']),
    loginUserLogic,
);

user_router.get(
    '/profile',
    checkrequiredheaders(['authorization']),
    authenticateUser(false),
    getUserProfileLogic,
);

user_router.delete(
    '/logout',
    checkrequiredheaders(['authorization']),
    authenticateUser(true),
    logoutUserLogic,
);