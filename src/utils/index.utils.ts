import { IPayload } from "@interface";
import { compare, genSalt, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

export const signToken = async (payload: IPayload) => {
    let token: string = sign(payload, process.env.KEY || 'Hello World', { expiresIn: '30d' });
    return token;
}

export const verifyToken = async (token: string): Promise<IPayload> => {
    let s: string = process.env.KEY || 'Hello World';
    return verify(token, s) as IPayload;
}

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await genSalt(10);
    return await hash(password, salt);
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await compare(password, hash);
}