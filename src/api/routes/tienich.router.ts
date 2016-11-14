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
}



