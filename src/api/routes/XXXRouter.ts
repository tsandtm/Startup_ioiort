
import { Router, Response, Request } from 'express';
import * as session from 'express-session'
import * as  request from 'request'
import { AccountRepo } from '../repositories/Account.repo'
import { Account } from '../models/Account.model'
import { Store } from '../app'

export class XXXRouter {
    private router: Router;
    constructor() {
        this.router = Router();
    }

    public GetRouter = () => {
        this.router.route('/login/CheckLogin')
            .post(this.CheckLogin)
        this.router.route('/login/GetSession')
            .get(this.GetSession)
        return this.router;
    }


    /**
     * Login tài khoản Nếu đúng thì nó lưu Cache với key = UserName
     */
    private CheckLogin = (req: Request, res: Response) => {
        let option = new Account();
        option = req.body;
        console.log(req.body);
        console.log(option);
        return new AccountRepo().FindOne(option)
            .then((result) => {
                return result;
            })
            .then((result) => {
                if (result !== 0) {
                    console.log("result" + result);
                    req.session["AccountID"] = result;
                    Store.set(req.session.id, req.session, err => {
                        if (err) {
                            res.status(500).send("error");
                        }
                        console.log("sess: " + JSON.stringify(req.session));
                    })
                    return res.status(200).send("success");
                }
                else {
                    return res.status(200).send("error");
                }
            })
            .catch(() => { return res.sendStatus(404) })
    }

    /**
     * Lấy session khi đã đăng nhập thành công
     */
    private GetSession = (req: Request, res: Response) => {
        let AccountID = req.session["AccountID"];
        if(AccountID == undefined){
            return res.status(200).send("error");
        }
        return res.status(200).send(AccountID);
    }

}


