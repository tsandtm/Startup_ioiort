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
        this.router.route('/Tag/CreateTag')
            .post(this.CreateTag);
        return this.router;
    }

    private getAllTag = (req: Request, res: Response) => {
        let AccountID = req.query.AccountID;
        this.tagRepo.getList(AccountID)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }

    private CreateTag = (req: Request, res: Response) => {
        let option = new Tag();
        option.TagNameDisplay = req.body.TagNameDisplay;
        option.AccountID = req.body.AccountID;
        option.IsDefault = req.body.IsDefault;

        this.tagRepo.CreateTag(option)
            .then((result) => {
                res.status(200).json(result);
            });
    }
    
}

