import { authenticateSocketUser } from "@middlewares";
import { ReceiveEvents } from "@receive-events";
import { SendEvent } from "@send-events";
import { Server, Socket } from "socket.io";

const roomId = 'test-room'

export const WebSockets = async (io: Server) => {
    /// authenticate user before connecting to socket
    io.use(authenticateSocketUser);
    io.on(ReceiveEvents.CONNECT, async (socket: Socket) => {
        console.log(`user connected with username ${socket.data.user.username}`)
        console.log(socket.rooms)
        
        /// join user to room
        socket.on(ReceiveEvents.JOIN_ROOM, async (data) => {
            await socket.join(roomId);
            console.log(socket.rooms.values())
            socket.broadcast.to(roomId).emit(SendEvent.RECEIVE_MESSAGE, {
                from: 'System',
                message: `${socket.data.user.username} has joined the room`,
                from_userId: 'System',
                from_name: 'System',
            });

            socket.emit('open-input', {});
        });

        /// send user profile to client after authentication
        socket.emit(SendEvent.SEND_USER_PROFILE, socket.data.user);

        /// incoming messages from client
        socket.on(ReceiveEvents.SEND_MESSAGE, (data) => {
            socket.broadcast.to(roomId).emit(SendEvent.RECEIVE_MESSAGE, {
                from: socket.data.user.username,
                from_userId: socket.data.user._id,
                from_name: socket.data.user.name,
                message: data.message,
            });
        })

        /// Disconnect user from server
        socket.on(ReceiveEvents.DISCONNECT, () => {
            /// leave user from room
            socket.leave(roomId);
            socket.broadcast.to(roomId).emit(SendEvent.RECEIVE_MESSAGE, {
                from: 'System',
                message: `${socket.data.user.username} has left the room`,
                from_userId: 'System',
                from_name: 'System',
            });
            console.log('user disconnected from server');
        })
    });
}