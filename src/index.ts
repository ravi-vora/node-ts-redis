import express, { Server } from 'express'
import dotenv from 'dotenv'
import { connectToDatabase } from './services/database.service.js';
import { connectToRedis } from './services/redis.service.js';

/**
 * importing all routes
 */
import DummyRouter from './routes/dummy.router.js'

dotenv.config();

connectToDatabase().then(() : void => {
    connectToRedis().then(() : void => {
        const app : Server = express();
        const port : string = process.env.PORT || '3000';

        app.use(express.json());

        app.use("/", DummyRouter);

        app.listen(port, () => console.log('server is running on port: 3000 ✔'));
    }).catch((e: Error) => {
        console.log('redis connection failed.')
    });
}).catch((e: Error) => {
    console.log(`database connection failed : ${e.message}`)
    process.exit(0);
})