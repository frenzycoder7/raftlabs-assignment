import 'module-alias/register';
import express, { Express } from 'express';
import { config } from 'dotenv'
import './global';
import { Server, createServer } from 'http';
import { user_router, vehicle_routes } from '@routes';
import { Server as SocketServer, } from 'socket.io'
import { WebSockets } from '@socket';
import { databaseConnection } from '@connection';
config({ path: '.env' });

const env: string | any = process.env.NODE_ENV;
const PORT: number | string | any = env === 'development' ? process.env.TEST_PORT || 7001 : process.env.PORT || 7002;
const DATABSE: string | null = env === 'development' ? process.env.TEST_DATABASE : process.env.DATABASE;

if (DATABSE == null) {
    console.log('database connection url not found in .env please add and restart');
    process.exit(404);
}

const app: Express = express();
const server: Server = createServer(app);
export const io: SocketServer = new SocketServer(server);
WebSockets(io)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', user_router);
app.use('/api/vehicle', vehicle_routes);



databaseConnection({ url: DATABSE });
server.listen(PORT, () => console.log(`
##################- ${env} -###############
🛡️  Server listening on port:${PORT} 🛡️ 
`))



