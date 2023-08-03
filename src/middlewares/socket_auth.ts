import { IPayload, IUser } from "@interface";
import { getUserService } from "@services";
import { verifyToken } from "@utils";
import { Socket} from "socket.io";

export const authenticateSocketUser = async (socket: Socket, next: any) => {
    try {
        if(socket.handshake.headers.authorization == null && socket.handshake.auth.authorization == null) next(new Error('please add authorization in headers of socket'));
        let token: string | any = socket.handshake.headers.authorization || socket.handshake.auth.authorization;
        if (!token) next(new Error('please add authorization in headers of socket'));
        let payload: IPayload = await verifyToken(token);
        let user: IUser[] | null = await getUserService({ _id: payload._id, token: token });
        if (user == null || user.length == 0) {
            next(new Error('authorization token is expired'));
        } else {
            socket.data.user = user[0];
            next();
        }
    } catch (error) {
        next(new Error(error.message));
    }
}