// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';

import path = require('path');
// import các module tạo table
import { AppRepo } from '../repositories/app.repo';





export class AppRouter {

    private router: Router;
    private appRepo: AppRepo;

    constructor() {
        this.router = Router();
        this.appRepo = new AppRepo();
    }


    public getRouter(): Router {

        this.router.route('/app')
            .get(this.getAllapp)
        // .post(this.createAContact)
        // .delete(this.deleteAContact);

        return this.router;
    }

    private getAllapp = (req: Request, res: Response) => {
        let option = { IsActive: req.query.IsActive };

        this.appRepo.getList(option)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }
}
