import { Router, Response, Request } from 'express';

// import các module tạo table
import { LogRepo } from '../repositories/Log.repo/log.repo';



export class LogRouter {

    private router: Router;
    private logrepo: LogRepo;

    constructor() {
        this.router = Router();
        this.logrepo = new LogRepo();
    }

    /**
     * GetRouter
     */
    public GetRouter(): Router {
        this.router.route('/')
            .get(this.Get)
            .post(this.Log);
        return this.router;
    }


    private Get(req: Request, res: Response) {
        return res.sendStatus(200)
    }
    private Log = (req: Request, res: Response) => {
        console.log(req.body)
        this.logrepo.InsertOne(req.body)
            .then(reuslt => {
                console.log(`OK`)
                res.sendStatus(200)
                return
            }).catch(err => {
                console.log(err)
                res.sendStatus(400)
            })
    }
}