// import * as passport from 'passport'
import { Router, Response, Request, NextFunction } from 'express';
import * as  request from 'request'
// import { Cookie } from '../models/Cookie.model'
import { Store } from '../app'
// import { SaveCookie, SaveSession, SetDataRequest } from '../routes/Controller.router'

export class checkSession {
    private router: Router;
    constructor() {
        this.router = Router()
    }

    public GetRoute = () => {
        this.router.route('')
            .get(this.login)
        return this.router;
    }

    private login(req: Request, res: Response, next: NextFunction) {
        console.log(` CLient dang nghe ${req.url}, status ${req.statusCode}`)
        Store.get(req.session.id, (err, session) => {
            if (err) {
                console.error("k co session");
                return res.redirect(`../#/login`)
            }
            else {
                if (session) {
                    console.log('co session')
                    next()
                }
                else {
                    console.log(req.query.redirect)
                    if (req.query.redirect) {
                        next()
                    } else {
                        res.redirect(`..?redirect=true/#/login`)
                    }
                }
            }
        });
    }


}