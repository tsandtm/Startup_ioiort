import { Router, Response, Request } from 'express';

import path = require('path');
// import các module tạo table
import { TinTucRepo } from '../repositories/tintuc.repo';
import{TinTuc} from '../models/tintuc.model';
export class TinTucRouter {

    private router: Router;
    private tintucRepo: TinTucRepo;

    constructor() {
        this.router = Router();
        this.tintucRepo = new TinTucRepo();

        //this.model = model;
    }


    public getRouter(): Router {
        this.router.route('/tintuc/:id?')
            .get(this.getAllBook)
        this.router.route('/xoa')//asd
            .post(this.deleteABook);
        this.router.route('/tintuc')
            .post(this.update);
        this.router.route('/xoatin')
        .post(this.xoatin);
        // this.router.route('/phuchoi')
        // .post(this.phuchoi);
        this.router.route('/daxem')
            .post(this.daxem);
        this.router.route('/tinquantam')
            .get(this.getallquantam)
        this.router.route('/tinchuadoc')
            .get(this.chuadoc);
        this.router.route('/tinnoibat/:id?')
            .get(this.tinnoibat);
        return this.router;
    }
    private getAllBook = (req: Request, res: Response) => {
        let limit = req.query.limit ? req.query.limit : "all";
        let offset = req.query.offset ? req.query.offset: 0;

        this.tintucRepo.getList(null,limit,offset)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    } 
    private getallquantam = (req: Request, res: Response) => {
        // let limit = req.query.limit ? req.query.limit : "all";
        // let offset = req.query.offset ? req.query.offset: 0;

        this.tintucRepo.quantam(null)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    } 
    private chuadoc = (req: Request, res: Response) => {
        // let limit = req.query.limit ? req.query.limit : "all";
        // let offset = req.query.offset ? req.query.offset: 0;

        this.tintucRepo.chuadoc(null)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    } 
    private tinnoibat = (req: Request, res: Response) => {
        let limit = req.query.limit ? req.query.limit : "all";
        let offset = req.query.offset ? req.query.offset: 0;
        this.tintucRepo.TinNoiBat(null,limit,offset)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }
    private xoatin = (req: Request, res: Response) => {
        let option = new TinTuc();
        option = req.body;

        this.tintucRepo.xoatin(option)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).send(error.message);
            });
    }
    //  private phuchoi = (req: Request, res: Response) => {
    //     let option = new TinTuc();
    //     option = req.body;

    //     this.tintucRepo.phuchoi(option)
    //         .then((result) => {
    //             res.status(200).json(result);
    //         })
    //         .catch((error) => {
    //             console.error(error.message);
    //             res.status(500).send(error.message);
    //         });
    // }
    private update = (req: Request, res: Response) => {
        let option = new TinTuc();
        option = req.body;

        this.tintucRepo.update(option)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).send(error.message);
            });
    }
    private daxem = (req: Request, res: Response) => {
        let option = new TinTuc();
        option = req.body;

        this.tintucRepo.daxem(option)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).send(error.message);
            });
    }
     private deleteABook = (req: Request, res: Response) => {
        let option = new TinTuc();
        option = req.body;

        this.tintucRepo.delele(option)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).send(error.message);
            });
    }


//xai d======================================================
    // private deleteABook = (req: Request, res: Response) => {
    //     console.log(req.body)
    //     this.tintucRepo.delete(req.params.id)
    //         .then(result => {
    //             res.status(200).json(result)
    //         })
    //         .catch(error => {
    //             console.error('Error: ' ,error)
    //             res.status(500).send(error.message)
    //         })
    // }

    //cat+============================================

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
