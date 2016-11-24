// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';

import path = require('path');
// import các module tạo table
import { TienIchRepo } from '../repositories/tienich.repo';

// let mockProduct = require(path.join(__dirname,'..','json','products.json'));




export class TienIchRouter {

    private router: Router;
    private tienichRepo: TienIchRepo;

    constructor() {
        this.router = Router();
        this.tienichRepo = new TienIchRepo();

        //this.model = model;
    }


    public getRouter(): Router {

        this.router.route('/tienich')
            .get(this.getAllTienich)
            .post(this.themTienIch)
            .delete(this.xoaTienIch)
            .put(this.suaTienIch);
            return this.router;
            
            // .post(this.createABook)
            // .delete(this.deleteABook);
        
       // this.router.get('/countBook',this.countBook)
    }

    private getAllTienich = (reqs: Request, res: Response) => {

        //res.status(200).json(mockProduct);

        // let object={ id: 1, name: 'book1' };

        this.tienichRepo.getList(null)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }

    private themTienIch = (reqs: Request, res: Response) => {
        this.tienichRepo.add(reqs.body)
            .then(result => res.status(200).json(result))
            .catch(error => {
                res.status(500).send(error.message)
                console.error('Error: ', error.message)
            })
    }
     private xoaTienIch = (reqs: Request, res: Response) => {
        this.tienichRepo.xoa(reqs.query.id)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
            console.error(error.message);
            res.status(500).send(error.message);
        })
    }
    
    private suaTienIch = (reqs: Request, res: Response) => {
        this.tienichRepo.suaTienIch(reqs.body)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).send(error.message))
    }

}


