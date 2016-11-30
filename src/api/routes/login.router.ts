import { Router, Response, Request } from 'express';

// import các module tạo table
import { contact } from '../models/contact.model'
import { ContactRepo } from '../repositories/contact.repo';



export class LoginRouter {

    private router: Router;
    private contactrepo: ContactRepo;

    constructor() {
        this.router = Router();
        this.contactrepo = new ContactRepo();
    }

    /**
     * GetRouter
     */
    public GetRouter(): Router {
        this.router.route('/login')
            .get(this.Get)
            .post(this.Login);
        return this.router;
    }


    private Get(req: Request, res: Response) {
        return res.sendStatus(200)
    }
    private Login = (req: Request, res: Response)=> {
        console.log(req.body)
        this.contactrepo.count(req.body)
            .then(result => {
                if(result === 'OK')
                    return res.status(200).send({ Message: result })
                else    
                    return  res.status(400).send({ Message: result })
            })
            .catch(err => res.status(400).send({ Message: err }))
    }
}