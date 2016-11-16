import { Router, Response, Request } from 'express';

import path = require('path');

import { YeucaubanRepo } from '../repositories/yeucauban.repo';


export class  YeucaubanRouter {

    private router: Router;
    private yeucaubanRepo: YeucaubanRepo;

    constructor() {
        this.router = Router();
        this.yeucaubanRepo = new YeucaubanRepo();
    }
    public getRouter(): Router {

        this.router.route('/yeucauban')
            .get(this.getAllYeucauban)  
            .get(this.createYeucauban)     
        return this.router;
    }
     private getAllYeucauban = (req: Request, res: Response) => {

        this.yeucaubanRepo.getList(null)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }
     

    private createYeucauban = (req, res) => {
        res.send('created')
    }

    
}