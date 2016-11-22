// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';
import { Tag } from '../models/Tag.model'

import path = require('path');
// import các module tạo table
import { TagRepo } from '../repositories/Tag.repo';



export class TagRouter {

    private router: Router;
    private tagRepo: TagRepo;

    constructor() {
        this.router = Router();
        this.tagRepo = new TagRepo();
    }

    public getRouter(): Router {
        this.router.route('/Tag')
            .get(this.getAllTag);
        return this.router;
    }

    private getAllTag = (req: Request, res: Response) => {
        this.tagRepo.getList()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }
    
}

