import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './services/database.service.js';
import { connectToRedis } from './services/redis.service.js';
/**
 * importing all routes
 */
import DummyRouter from './routes/dummy.router.js';
dotenv.config();
connectToDatabase().then(() => {
    connectToRedis().then(() => {
        const app = express();
        const port = process.env.PORT || '3000';
        app.use(express.json());
        app.use("/", DummyRouter);
        app.listen(port, () => console.log('server is running on port: 3000 ✔'));
    }).catch((e) => {
        console.log('redis connection failed.');
    });
}).catch((e) => {
    console.log(`database connection failed : ${e.message}`);
    process.exit(0);
});
//# sourceMappingURL=index.js.map