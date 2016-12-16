import { Router, Response, Request } from 'express';
import { contact } from '../models/contact.model';
import {ContactRepo} from '../repositories/contact.repo';
export class FacebookRouter {
    private router: Router;
    private contactRe:ContactRepo;
    constructor() {
        this.router = Router();
        this.contactRe=new ContactRepo();
    }

    public GetRouter(): Router {
    this.router.route('/InsertUserFacebook').post(this.InsertUserFacebook);
    this.router.route('/GetUserFacebook').post(this.GetUserFacebook);
    return this.router;
    }
    public InsertUserFacebook=(req:Request,res:Response)=>{
        let user=new contact();
        user.Facebook=req.body.Facebook;
        user.Email=req.body.email;
        user.HoTen=req.body.name;
        user.Token=req.body.token;
        console.log(user);
        this.contactRe.InsertUserFacebook(user).then(response=>{
                res.status(200).json(response);
        }).catch(err=>{
            res.status(500).json(err);
        })
    }
    public GetUserFacebook=(req:Request,res:Response)=>{
            this.contactRe.GetUserFacebook(req.body.Facebook).then(result=>{
                if(result===null)
                {
                    res.status(200).send('-1');
                }
                else{
                    res.status(200).send(result);
                }
                //res.status(200).send(result);
            }).catch(err=>{res.status(500).json(err)});
    }
}

// khi muon chay cai nay thi hau nhu no khong hien thong tin copy 2 cái route get ra ngoài app.ts và nội dung
//trong hàm GetProfile là chạy test được.