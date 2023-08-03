import { ISearchQuery, IUser } from '@interface';
import express, { Application } from 'express';
import { Server, Socket, DisconnectReason } from 'socket.io';
declare global {
    namespace Express {
        interface Request {
            user: IUser,
            limit: number,
            page: number,
            searchQuery: ISearchQuery,
            sort: number;
            sortKey: string | undefined | null;
        }
    }

    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            DATABASE: string;
            TEST_PORT: string;
            TEST_DATABASE: string;
            NODE_ENV: string;
        }
    }
}