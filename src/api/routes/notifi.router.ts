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
        .get(this.getAllNoti)
        .post(this.Update);

        this.router.route("/sl")
        .get(this.getSL)
        .post(this.getSLsend)


        this.router.route("/sentuser")
        .get(this.getSentUser)
        .post(this.Insert)
        
        


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
    
    private Update = (req: Request, res: Response) => {
        this.notifiRepo.Update(req.body)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }
    private Insert = (req: Request, res: Response) => {
        this.notifiRepo.Insert(req.body)
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
        this.notifiRepo.getSL(req.query)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }
    private getSLsend = (req: Request, res: Response) => {
        this.notifiRepo.getslsend(req.body)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }
    private getSentUser = (req: Request, res: Response) => {
        this.notifiRepo.getSentUser(req.query)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }
}
