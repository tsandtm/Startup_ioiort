// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';
import { Contact } from '../models/Contact.model'

import path = require('path');
// import các module tạo table
import { ContactRepo } from '../repositories/Contact.repo';

export class ContactRouter {

    private router: Router;
    private contactRepo: ContactRepo;

    constructor() {
        this.router = Router();
        this.contactRepo = new ContactRepo();
    }


    public getRouter(): Router {

        this.router.route('/Contactnotifi')
            .get(this.getAllContact)
        // .post(this.createAContact)
        // .delete(this.deleteAContact);
        this.router.route('/Contact')
            .get(this.getAllContact);
        this.router.route('/Contact/GetOne')
            .get(this.getOne);
        this.router.route('/Contact/Create')
            .post(this.create);
        this.router.route('/Contact/Update')
            .post(this.update);
        this.router.route('/Contact/SearchByTag')
            .get(this.SearchByTag);
        return this.router;
    }

    private getAllContact = (req: Request, res: Response) => {
        let option = new Contact();
        option = req.query;
        this.contactRepo.getList(option)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }

    private getOne = (req: Request, res: Response) => {
        let option = { ContactID: req.query.ContactID };

        this.contactRepo.getOne(option)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).send(error.message);
            })
    }

    private create = (req: Request, res: Response) => {
        let option = new Contact();
        option = req.body;

        console.log(option);

        this.contactRepo.create(option)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).send(error.message);
            });
    }

    private update = (req: Request, res: Response) => {
        let option = new Contact();
        option = req.body;

        this.contactRepo.update(option)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).send(error.message);
            });
    }

    private SearchByTag = (req: Request, res: Response) => {
        let Contact_TagName = req.query.Contact_TagName;
        this.contactRepo.SearchByTag(Contact_TagName)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error(error.message);
            res.status(500).send(error.message);
        })
    }

}

