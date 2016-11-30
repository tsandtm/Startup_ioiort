import { Router, Response, Request } from 'express';

import path = require('path');
// import các module tạo table
import { UserRepo } from '../repositories/user.repo';
import { User } from '../models/user.model';
export class UserRouter{

    private _router: Router;
    private _userRepo: UserRepo;

    constructor() {
        this._router = Router();
        this._userRepo = new UserRepo();

        //this.model = model;
    }
     public getRouter(): Router {

        this._router.route('/User/Login').post(this.CheckLogin);
        return this._router;
    }
     CheckLogin=(req:Request,res:Response)=>
    {
        let TaiKhoan=req.body.TaiKhoan;
        let Password=req.body.Password;
        this._userRepo.CheckLogin(TaiKhoan,Password).then((response)=>{res.status(200).json(response)}).catch((err)=>res.status(500).send(err));
    }
}