import { Router } from 'express';
import { Dummy } from '../models/dummy.model.js';
import { redisClient } from '../services/redis.service.js';
const router = Router();
router.get('/', (request, respones) => {
    Dummy.find({}).limit(1000).then((result) => {
        respones.status(200).json(result);
    });
});
router.get('/redis', (request, respones) => {
    var data = redisClient.get('data:initial');
    data.then((result) => {
        if (result) {
            respones.status(200).json(JSON.parse(result));
        }
        else {
            Dummy.find({}).limit(1000).then((result) => {
                redisClient.set("data:initial", JSON.stringify(result)).then(() => {
                    respones.status(200).json(result);
                }).catch((e) => {
                    respones.status(500).json({
                        msg: e.message
                    });
                });
            });
        }
    }).catch((e) => {
        respones.status(200).json({
            msg: e.message
        });
    });
});
export default router;
//# sourceMappingURL=dummy.router.js.map