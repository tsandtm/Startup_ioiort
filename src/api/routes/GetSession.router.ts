import { Router, Response, Request, } from 'express';
import { Store } from '../app'

export class GetSession {
    private router: Router;
    private Sever: string;
    constructor() {
        this.router = Router()
    }

    public GetRouter = () => {
        this.router.route('/GetSession')
            .post(this.Session)
        return this.router;
    }

    private Session = (req: Request, res: Response) => {
        let Ac = req.session
        console.log("AccountID: "+JSON.stringify(Ac) );
    }

}