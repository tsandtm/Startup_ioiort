// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';

import path = require('path');
// import các module tạo table
import { ListNewsRepo } from '../repositories/news.repo';
import { ListNews } from '../models/news.model'

let mockNews = require(path.join(__dirname,'..','json','news.json'));



export class NewsRouter {

    private router: Router;
    private newsRepo: ListNewsRepo;

    constructor() {
        this.router = Router();
        this.newsRepo = new ListNewsRepo();

        //this.model = model;
    }


    public getRouter(): Router {

        this.router.route('/news')
            .get(this.getAllNews);
        
        // this.router.get('/countNews',this.countNews)


        return this.router;
    }

    private getAllNews = (req: Request, res: Response) => {

        this .newsRepo.getList(null)
                .then(lnw => {
                    res.status(200).json(lnw);
                })
                .catch(err => {
                    console.error(err);
                    return Promise.reject(err);
                })
        

        // let object={ id: 1, name: 'book1' };

        // this.bookRepo.getList(null)
        //     .then(result => {
        //         res.status(200).json(result)
        //     })
        //     .catch(error => {
        //         console.error(error.message);
        //         res.status(500).send(error.message)
        //     })
    }

    // private deleted = (req: Request, res: Response) => {
    //     this .newsRepo.deleted(id)
    //     .then( lnw=> {

    //     })
    // }
    private countNews= (req: Request,res: Response) => {
        this.newsRepo.count(null)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message);
            })
    }
}
