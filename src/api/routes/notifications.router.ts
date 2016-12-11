import { Router, Response, Request } from 'express';

import path = require('path');

import { NotificationsRepo } from '../repositories/notifications.repo';

//let mockProduct = require(path.join(__dirname,'..','json','products.json'));




export class NotificationsRouter {

    private router: Router;
    private notificationsRepo: NotificationsRepo;

    constructor() {
        this.router = Router();
        this.notificationsRepo = new NotificationsRepo();
    }
    public getRouter(): Router {

        this.router.route('/notification')
            .get(this.getAllNotifications)  
            .get(this.createANotifications)
        this.router.route("/notificationedit")
            .post(this.Edit);
     
            
        this.router.route('/getlistsenduser')
            .get(this.getListSendContact)  
        return this.router;
    }
     private getAllNotifications = (req: Request, res: Response) => {
   
      //  let object={ id: 1, ToKen: 'contact' };

        this.notificationsRepo.getList(null)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }
     
    private getListSendContact = (req: Request, res: Response) => {
        this.notificationsRepo.getAllSendUser()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }

    private createANotifications = (req, res) => {
        res.send('created')
    }
    private Edit = (req: Request, res: Response) => {
        this.notificationsRepo.Edit(req.body)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }
}