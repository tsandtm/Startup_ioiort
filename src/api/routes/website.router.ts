// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';

import path = require('path');
// import các module tạo table
import { ListWebRepo } from '../repositories/website.repo';
import { ListWeb } from '../models/website.model'

// let mockNews = require(path.join(__dirname,'..','json','news.json'));



export class WebsRouter {

    private router: Router;
    private websRepo: ListWebRepo;

    constructor() {
        this.router = Router();
        this.websRepo = new ListWebRepo();

    }


    public getRouter(): Router {

        this.router.get('/GetList/:IDUser',this.GetList)
        this.router.get('/getName',this.getName)
        




        return this.router;
    }

    
    /**
     * req.params.IDUser
     */
    private GetList = (req: Request, res: Response) =>{
        let limit = req.query.limit;
        let offset = req.query.offset;
        console.log(`${limit}_${offset}`)
        this.websRepo.GetList(req.params.IDUser,limit,offset)
            .then(result => res.status(200).json(result))
            .catch(err => Promise.reject(err))
    }


    private getName = (req: Request, res: Response) => {
        console.log("string " + req.query.string)
        this.websRepo.getName(req.query.string,req.query.IDUser)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.error(err);
                return Promise.reject(err);
            })
    }

}
