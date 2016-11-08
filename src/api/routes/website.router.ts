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

        //this.model = model;
    }


    public getRouter(): Router {

        this.router.route('/website')
            .get(this.getAllWebs);
        this.router.get('/getWebs',this.getWebs)
        // this.router.get('/countNews',this.countNews)


        return this.router;
    }

    private getAllWebs = (req: Request, res: Response) => {

        this .websRepo.getList(null)
                .then(lnw => {
                    res.status(200).json(lnw);
                })
                .catch(err => {
                    console.error(err);
                    return Promise.reject(err);
                })
    }
      private getWebs = (req: Request, res: Response) => {

        this .websRepo.getListShow(null)
                .then(lnw => {
                    res.status(200).json(lnw);
                })
                .catch(err => {
                    console.error(err);
                    return Promise.reject(err);
                })
    }

}
