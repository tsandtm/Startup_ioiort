// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';

import path = require('path');
// import các module tạo table
import { ListNewsRepo } from '../repositories/news.repo';
import { ListNews } from '../models/news.model'

let mockNews = require(path.join(__dirname, '..', 'json', 'news.json'));



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
            .get(this.getAllNews)
            .delete(this.deleteNews);

        this.router.get('/getNews', this.getNews)
        this.router.get('/gettinnoibat', this.gettinnoibat)
        // this.router.get('/countNews',this.countNews)


        return this.router;
    }

    private getAllNews = (req: Request, res: Response) => {

        this.newsRepo.getList(null, req.query.limit, req.query.skip)
            .then(lnw => {
                return res.status(200).json(lnw);
            })
            .catch(err => {
                console.error(err);
                return Promise.reject(err);
            })
    }

    private getNews = (req: Request, res: Response) => {

        this.newsRepo.getNew(null, req.query.limit, req.query.skip)
            .then(lnw => {
                return res.status(200).json(lnw);
            })
            .catch(err => {
                console.error(err);
                return Promise.reject(err);
            })
    }

    /*** */
    private gettinnoibat = (req: Request, res: Response) => {

        this.newsRepo.gettinnoibat(null, req.query.limit, req.query.skip)
            .then(lnw => {
                return res.status(200).json(lnw);
            })
            .catch(err => {
                console.error(err);
                return Promise.reject(err);
            })
    }

    private deleteNews = (req: Request, res: Response) => {
        this.newsRepo.DeleteNews(req.query.id)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(error => {
                console.error(error.message);
                return res.status(500).send(error.message);
            })
    }


    // private countNews= (req: Request,res: Response) => {
    //     this.newsRepo.count(null)
    //         .then(result => {
    //             res.status(200).json(result);
    //         })
    //         .catch(error => {
    //             console.error(error.message);
    //             res.status(500).send(error.message);
    //         })
    // }
}
