// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';

import path = require('path');
// import các module tạo table
import { LoaiTinDangRepo } from '../repositories/loaitindang.repo';

// let mockProduct = require(path.join(__dirname,'..','json','products.json'));




export class LoaiTinDangRouter {

    private router: Router;
    private loaitindangRepo: LoaiTinDangRepo;

    constructor() {
        this.router = Router();
        this.loaitindangRepo = new LoaiTinDangRepo();

        //this.model = model;
    }


    public getRouter(): Router {

        this.router.route('/loaitindang')
            .get(this.getAllLoaiTinDang)
            .post(this.themLoaiTinDang)
            .put(this.suaLoaiTinDang)
            .delete(this.xoaLoaiTinDang)
            return this.router;
            // .post(this.createABook)
            // .delete(this.deleteABook);
        
       // this.router.get('/countBook',this.countBook)
    }

    private getAllLoaiTinDang = (reqs: Request, res: Response) => {

        //res.status(200).json(mockProduct);

        // let object={ id: 1, name: 'book1' };

        this.loaitindangRepo.getList(null)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }

    private themLoaiTinDang = (reqs: Request, res: Response) => {
        this.loaitindangRepo.add(reqs.body)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).send(error.message))
    }
    private suaLoaiTinDang = (reqs: Request, res: Response) => {
        this.loaitindangRepo.suaLoaiTinDang(reqs.body)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).send(error.message))
    }
     private xoaLoaiTinDang = (reqs: Request, res: Response) => {
        this.loaitindangRepo.xoaLoaiTinDang(reqs.query.id)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
            console.error(error.message);
            res.status(500).send(error.message);
        })
    }




