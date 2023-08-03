import { NextFunction, Request, Response } from "express";


export const filterRequiredKeys = (schema: any) => {
    let keys = schema;
    let requred: string[] = [];
    for (let key in keys) {
        if (keys[key].required && keys[key].ref == undefined) {
            requred.push(key);
        }
    }
    return requred;
}

export const checkrequiredheaders = (headers: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        for (const header of headers) {
            if (!req.headers[header]) {
                return res.status(400).json({
                    message: `Missing ${header} in request headers`
                })
            }
        }
        next();
    }
}


export const checkrequiredbody = (bodys: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        for (const body of bodys) {
            if (!req.body[body]) {
                return res.status(400).json({
                    message: `Missing ${body} in request body`
                })
            }
        }
        next()
    }
}





export const checkrequiredquery = (queries: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        for (const query of queries) {
            if (!req.query[query]) {
                return res.status(400).json({
                    message: `Missing ${query} in request query`
                })
            }
        }
        next();
    }
}

export const checknotrequiredbody = (bodys: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        for (const body of bodys) {
            if (req.body[body]) {
                return res.status(400).json({
                    message: `${body} is not required in request body`
                })
            }
        }
        next();
    }
}