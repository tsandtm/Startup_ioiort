// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';

import path = require('path');
// import các module tạo table
import { NotifiRepo } from '../repositories/notifi.repo';





export class NotifiRouter {

    private router: Router;
    private notifiRepo: NotifiRepo;

    constructor() {
        this.router = Router();
        this.notifiRepo = new NotifiRepo();
    }


    public getRouter(): Router {

        this.router.route('/notifi')
            .get(this.getLastNoti)
            .post(this.Create)
        // .delete(this.deleteAContact);
        this.router.route("/notifigetone")
        .get(this.getAllNoti);

        this.router.route("/sl")
        .get(this.getSL);

        return this.router;
    }

    private Create = (req: Request, res: Response) => {
        this.notifiRepo.Create(req.body)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }

    private getAllNoti = (req: Request, res: Response) => {
        this.notifiRepo.getAllNoti(req.body)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }

    private getLastNoti = (req: Request, res: Response) => {
        this.notifiRepo.getLastNoti()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }
    private getSL = (req: Request, res: Response) => {
        this.notifiRepo.getSL(req.body)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }
}
