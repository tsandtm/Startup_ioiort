import { Response, Request, NextFunction } from 'express';

export let Middlewave = (req: Request, res:Response , next : NextFunction) => {
    let id = req.params.id;
    let IDUser = req.params.IDUser;
    let idtintuc = req.params.idtintuc;
    let limit = req.query.limit;
    let offset = req.query.offset;
    let idDanhMuc = req.query.idDanhMuc;
    let idUser = req.query.idUser;
    let PIDUser = req.body.IDUser;
    let Pid = req.body.id;
    let IDDanhMucSite = req.body.IDDanhMucSite
}