// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';

import path = require('path');
// import các module tạo table
import { TinTucRepo } from '../repositories/tintuc.repo';

export class TinTucRouter {

    private router: Router;
    private tintucRepo: TinTucRepo;

    constructor() {
        this.router = Router();
        this.tintucRepo = new TinTucRepo();

        //this.model = model;
    }


    public getRouter(): Router {

        this.router.route('/tintuc/:id?')
            .get(this.getAllBook)
            .delete(this.deleteABook);
        return this.router;
    }
    private getAllBook = (req: Request, res: Response) => {


        this.tintucRepo.getList(null)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }
    private deleteABook = (req: Request, res: Response) => {
        this.tintucRepo.delete(req.params.id)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error('Error: ' ,error)
                res.status(500).send(error.message)
            })
    }
    // private create=(req:Request,res:Response)=>{
    //     thí
    // }

}





