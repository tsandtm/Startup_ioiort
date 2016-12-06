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
        // .put(this.updateShow);
        this.router.get('/getWebs/:id?', this.getList_User);


        // this.router.get('/countNews',this.countNews)


        return this.router;
    }

    private getAllWebs = (req: Request, res: Response) => {

        console.log(req.query.limit);
        console.log(req.query.skip);

        this.websRepo.getList(null,req.query.limit, req.query.skip)
            .then(lnw => {
                res.status(200).json(lnw);
            })
            .catch(err => {
                console.error(err);
                return Promise.reject(err);
            })
    }
    private getList_User = (req: Request, res: Response) => {

        this.websRepo.getList_User(req.params.id)
            .then(lnw => {
                res.status(200).json(lnw);
            })
            .catch(err => {
                console.error(err);
                return Promise.reject(err);
            })
    }

    // private updateShow = (req: Request, res: Response) => {

    //     this.websRepo.UpdateShow(req.query.id, req.body)
    //         .then(result => {
    //             res.status(200).json({ show: true });
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             return Promise.reject(err);
    //         })
    // }

}
