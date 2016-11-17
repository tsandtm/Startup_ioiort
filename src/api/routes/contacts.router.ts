import { Router, Response, Request } from 'express';

import path = require('path');

import { ContactsRepo } from '../repositories/contacts.repo';

//let mockProduct = require(path.join(__dirname,'..','json','products.json'));




export class ContactsRouter {

    private router: Router;
    private contactsRepo: ContactsRepo;

    constructor() {
        this.router = Router();
        this.contactsRepo = new ContactsRepo();
    }
    public getRouter(): Router {

        this.router.route('/contact')
            .get(this.getAllContacts)       
        return this.router;
    }
     private getAllContacts = (req: Request, res: Response) => {
   
      //  let object={ id: 1, ToKen: 'contact' };

        this.contactsRepo.getList(null)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }
}