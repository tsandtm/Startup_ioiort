import { Router, Response, Request } from 'express';

import path = require('path');
// import các module tạo table
import { SettingRepo } from '../repositories/setting.repo';

export class SettingRouter {

    private router: Router;
    private settingRepo: SettingRepo;

    constructor() {
        this.router = Router();
        this.settingRepo = new SettingRepo();

        //this.model = model;
    }

    
    public getRouter(): Router {
        console.log('abc');
        this.router.route('/setting')
            .get(this.getAllSetting)
            .post(this.Create);     
        this.router.route('/settingPT')
            .get(this.getAllSettingPT);       
        this.router.route("/settingedit")
            .post(this.Edit);
        this.router.route("/settingdelete")
            .post(this.Delete);
        this.router.get('/settingcount',this.getcount);
        this.router.get('/settingAppName',this.getAppName);
        this.router.get('/settingAPI',this.getAPI);
        this.router.get('/settingAppID',this.getAppID);
        return this.router;
    }

    private getAllSetting = (req: Request, res: Response) => {
        console.log('abc'+req.body.id);
        this.settingRepo.getList(req.body)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }
    private getAllSettingPT = (req: Request, res: Response) => {
        console.log('abcs'+req.query.so);
        this.settingRepo.getListPT(req.query.so)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }
    private getAppName = (req: Request, res: Response) => {
        console.log('abcs'+req.query.so+' APPNAME '+req.query.ten);
        this.settingRepo.getAppName(req.query)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }
    private getAPI = (req: Request, res: Response) => {
        console.log('abcs'+req.query.so+' API '+req.query.id);
        debugger;
        this.settingRepo.getAPI(req.query)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }
    private getcount = (req: Request, res: Response) => {
        console.log('abcs'+req.query.so);
        this.settingRepo.getcount()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }
    private getAppID = (req: Request, res: Response) => {
        console.log('abcs'+req.query.so);
        this.settingRepo.getAppID()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }
    private Create = (req: Request, res: Response) => {
        this.settingRepo.Create(req.body)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }
    private Delete = (req: Request, res: Response) => {
        this.settingRepo.Delete(req.body)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }
    private Edit = (req: Request, res: Response) => {
        this.settingRepo.Edit(req.body)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            });
    }

    


}