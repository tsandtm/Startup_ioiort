// import * as passport from 'passport'
import { Router, Response, Request, NextFunction } from 'express';
import * as  request from 'request'
// import { Cookie } from '../models/Cookie.model'
import { Store } from '../app'
// import { SaveCookie, SaveSession, SetDataRequest } from '../routes/Controller.router'

export class Login {
    private router: Router;
    private Sever: string;
    constructor() {
        this.router = Router()
    }

    public GetRoute = () => {
        this.router.route('/')
            .get(this.login)
            .post(this.Send)
        return this.router;
    }

    private login(req: Request, res: Response) {
        res.render("../login");
    }

    private Send = (req: Request, res: Response, next: NextFunction) => {
        console.log("POST")
        let UserName = req.body.UserName;
        let PassHash = req.body.PassHash;
        request.post(`http://localhost:4000/login`, (err, respone, body) => {
            console.log("respon: "+JSON.stringify(respone));
            if (respone.statusCode === 200) {
                Store.set(req.session.id, req.session, err => {
                    if (err) {
                        res.status(500).send("error");
                    }
                    res.status(200).send("success");
                })
            }
            else {
                res.status(404).send("error");
           }
        }).json({ UserName: UserName, PassHash: PassHash })
    }

}