import { Router, Request, Response } from 'express'
import { Dummy } from '../models/dummy.model.js';
import { redisClient } from '../services/redis.service.js';

const router = Router();

router.get('/', (request: Request, respones: Response) : void => {
    Dummy.find({}).limit(1000).then((result) : void => {
        respones.status(200).json(result);
    })
})

router.get('/redis', (request: Request, respones: Response) : void => {
    var data = redisClient.get('data:initial')
    data.then( (result) => {
        if(result) {
            respones.status(200).json(JSON.parse(result));
        } else {
            Dummy.find({}).limit(1000).then((result) : void => {
                redisClient.set("data:initial", JSON.stringify(result)).then(() : void => {
                    respones.status(200).json(result);
                }).catch((e: Error) => {
                    respones.status(500).json({
                        msg: e.message
                    });
                });
            })
        }
    }).catch((e: Error) => {
        respones.status(200).json({
            msg: e.message
        })
    })
})

export default router;