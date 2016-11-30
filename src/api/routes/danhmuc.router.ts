// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';

import path = require('path');
// import các module tạo table
import { DanhMucRePo } from '../repositories/danhmuc.repo';
import{DanhMuc} from '../models/danhmuc.model';
export class DanhMucRouter {

    private router: Router;
    private danhmucRepo: DanhMucRePo;

    constructor() {
        this.router = Router();
        this.danhmucRepo = new DanhMucRePo();

        //this.model = model;
    }


    public getRouter(): Router {

        this.router.route('/danhmuc')
            .get(this.getAllBook);
            this.router.get('/getWebs', this.getList_User);
            //.delete(this.deleteABook);
            
        return this.router;
    }
    private getAllBook = (req: Request, res: Response) => {


        this.danhmucRepo.getList(null, req.query.limit, req.query.skip)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }
    private getList_User = (req: Request, res: Response) => {

        this.danhmucRepo.getList_User(null)
            .then(lnw => {
                res.status(200).json(lnw);
            })
            .catch(err => {
                console.error(err);
                return Promise.reject(err);
            })
    }
    // private deleteABook = (req: Request, res: Response) => {
    //     this.danhmucRepo.delete(req.params.id)
    //         .then(result => {
    //             res.status(200).json(result)
    //         })
    //         .catch(error => {
    //             console.error('Error: ' ,error)
    //             res.status(500).send(error.message)
    //         })
    // }
    // private editTinTuc=(req:Request,res:Response)=>{
    //     this.tintucRepo.edit(req.params.id)
    //         .then(result=>{
    //             res.status(200).json(result)
    //         })
    //         .catch(error=>{
    //             console.error('Error:',error)
    //             res.status(500).send(error.message)
    //         })
    // }
    // private createATinTuc
    // }
    // private create=(req:Request,res:Response)=>{
    //     thí
    // }
    // private create=(req:Request,res:Response)=>{
    //    this.tintucRepo.create((req, res) => {
    //      let id = req.query.id;
    //      TinTucModel.findById(id).then(tintuc => {
    //         if (tintuc) {
    //             let authorName = req.body.name;
    //             tintuc.createAuthor({ name: authorName })
    //             res.status(200).send('da tao them author vao book');
    //         } else {
    //             res.status(404).send('khong tim thay book voi id=' + id);
    //         }
    //     })
    //         .catch(error => {
    //             res.status(500).send(error.message);
    //         })
    // })
    //    }

}





