import { Router, Response, Request } from 'express';

import path = require('path');
// import các module tạo table
import { TinTucRepo } from '../repositories/tintuc.repo';
import { TinTuc } from '../models/tintuc.model';
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
            .post(this.update);
        this.router.route('/tindaxoa/:id?')
            .get(this.lktindaxoa)
        this.router.route('/xoa/:id?')
            .post(this.deleteABook);
        this.router.route('/boxoa')
            .post(this.boxoa);

        this.router.route('/xoatin')
            .post(this.xoatin);
        this.router.route('/daxem')
            .post(this.daxem);

        this.router.route('/tinquantam/:id/:idtintuc?') /**api cua tin quan tam */
        return this.router;
    }
    private lktindaxoa = (req: Request, res: Response) => {

        let limit = req.query.limit ? req.query.limit : "all";
        let offset = req.query.offset ? req.query.offset : 0;

        this.tintucRepo.lktindaxoa(req.params.id, limit, offset)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }
    private boxoa = (req: Request, res: Response) => {
        // let option = new TinTuc();
        // option = req.body;

        this.tintucRepo.boxoa(req.body.id,req.body.IDUser)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).send(error.message);
            });
    }
    private getAllBook = (req: Request, res: Response) => {
        let limit = req.query.limit ? req.query.limit : "all";
        let offset = req.query.offset ? req.query.offset : 0;
        this.tintucRepo.getList(req.params.id, limit, offset)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }
    private getallquantam = (req: Request, res: Response) => {
        let limit = req.query.limit ? req.query.limit : "all";
        let offset = req.query.offset ? req.query.offset : 0;

        this.tintucRepo.quantam(req.params, limit, offset)
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
    
    private xoatin = (req: Request, res: Response) => {
        // let option = new TinTuc();
        // option = req.body;
        console.log("id " + req.body.id);
        console.log("IDUSER " + req.body.IDUser);

        this.tintucRepo.xoatin(req.body.id, req.body.IDUser)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).send(error.message);
            });
    }

    private update = (req: Request, res: Response) => {
        // let option = new TinTuc();
        // option = req.body;

        this.tintucRepo.update(req.body.id, req.body.IDUser)
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

        this.tintucRepo.daxem(req.body.id, req.body.IDUser)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).send(error.message);
            });
    }
    private deleteABook = (req: Request, res: Response) => {

        this.tintucRepo.delele(req.body.id, req.body.IDUser)
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
