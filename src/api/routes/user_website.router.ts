// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';

import path = require('path');
// import các module tạo table
import { UserWebRepo } from '../repositories/user_website.repo';
import { User_Web } from '../models/user_website.model'

// let mockNews = require(path.join(__dirname,'..','json','news.json'));



export class UserWebsRouter {

    private router: Router;
    private userwebsRepo: UserWebRepo;

    constructor() {
        this.router = Router();
        this.userwebsRepo = new UserWebRepo();

        //this.model = model;
    }


    public getRouter(): Router {

        this.router.route('/userwebsite')
            .post(this.Create);
            // .put(this.updateShow);
        // this.router.get('/getWebs', this.getWebs);


        // this.router.get('/countNews',this.countNews)


        return this.router;
    }

    private Create = (req: Request, res: Response) => {

        this.userwebsRepo.Create(req.body)
            .then(lnw => {
                res.send(lnw);                
                res.status(200).json(lnw);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send(err)
            })
    }
    // private getWebs = (req: Request, res: Response) => {

    //     this.websRepo.getListShow(null)
    //         .then(lnw => {
    //             res.status(200).json(lnw);
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             return Promise.reject(err);
    //         })
    // }

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
