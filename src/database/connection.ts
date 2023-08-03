import { DatabaseConnectionArgs } from "@interface";
import { connect, connection, set } from "mongoose";
import Redis from 'ioredis';
export const databaseConnection = async (args: DatabaseConnectionArgs) => {
    try {
        set('allowDiskUse', true);
        set('strictQuery', true)
        await connect(args.url);
        console.log(`Database connected : ${connection.db.databaseName}`)
    } catch (error) {
        console.log('connection error', error);
    }
}

export const redisClient = new Redis({ name: 'assignment' });

redisClient.on('connect', () => {
    console.log('redis connection status: true');
});

redisClient.on('error', (error) => {
    console.log('redis connection error found', error);
});