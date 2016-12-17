// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';

// import các module tạo table
import { UserWebRepo } from '../repositories/user_website.repo';
import { User_Web } from '../models/user_website.model'




export class UserWebsRouter {

    private router: Router;
    private userwebsRepo: UserWebRepo;

    constructor() {
        this.router = Router();
        this.userwebsRepo = new UserWebRepo();

        //this.model = model;
    }


    public getRouter(): Router {

        this.router.route('/userwebsite')
            .get(this.GetUser)
            .post(this.Create)
            .delete(this.Delete);
        // .put(this.updateShow);
        // this.router.get('/getWebs', this.getWebs);


        // this.router.get('/countNews',this.countNews)


        return this.router;
    }

    private Create = (req: Request, res: Response) => {

        this.userwebsRepo.Create(req.body)
            .then(lnw => {
                return res.status(200).json(lnw);
            })
            .catch(err => {
                console.error(err);
                return res.status(500).send(err)
            })
    }

    private Delete = (req: Request, res: Response) => {
        console.log(`---------`)

        this.userwebsRepo.Delete({ idUser: req.query.idUser, idDanhMuc: req.query.idDanhMuc })
            .then(lnw => {
                return res.status(200).json(lnw);
            })
            .catch(err => {
                console.error(err);
                return res.status(500).send(err)
            })
    }

    private GetUser = (req: Request, res: Response) => {
        this.userwebsRepo.Get({ idUser: req.query.idUser })
            .then(lnw => {
                if(lnw != -1)
                    return res.sendStatus(200)
                else    
                    return res.sendStatus(400)
            })
            .catch(err => {
                console.error(err);
                return res.status(500).send(err)
            })
    }

}
