import { RepoBase } from './repositories.base';
import { Notifi,SLSend,SentUser,UpdateData,InsertUser } from '../models/notifi.model'
import { Pool, QueryResult } from 'pg';

export class NotifiRepo extends RepoBase {

    constructor() {
        super();
    }

    public Create(option): Promise<Notifi> {
        let queryText = 'INSERT INTO test."n_Notifications" values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [option.NotifiID,
        option.AppID,
        option.TieuDe,
        option.Noidung,
        option.Thoigiangui,
        option.ThoiHan,
        option.DoUuTien,
        option.Trangthai,
        option.Soluong,
        option.SendUser,
        option.SendTag,
        option.DeniedUser,
        option.DeniedTag,
        ])
            .then(result => {
                return null;
            });
    }
    public Insert(option): Promise<InsertUser> {
        let queryText = 'INSERT INTO test."n_Contacts_Notifications"("ContactID", "NotifiID") VALUES ($1, $2);';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [option.ContactID,
        option.NotifiID,
        ])
            .then(result => {
                return null;
            });
    }
    public Update(option): Promise<UpdateData> {
        let queryText = 'UPDATE test."n_Notifications" SET "TrangThaiGoi"=$1 WHERE "NotifiID"=$2;';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [option.Trangthai,option.NotifiID])
            .then(result => {
                return null;
            });
    }
    public getAllNoti(option): Promise<Notifi[]> {
        let queryText = 'select * from test."n_Notifications"';

        console.info('Excute: ' + queryText);
        let pResult;

        if (option.NotifiID != undefined) {
            pResult = this._pgPool.query(queryText + 'where "NotifiID" = ' + option.NotifiID)
        } else {
            pResult = this._pgPool.query(queryText)
        }


        return pResult.then(result => {
            let notifis: Notifi[] = result.rows.map(r => {
                let notifi = new Notifi();
                notifi.NotifiID = r.NotifiID;
                notifi.AppID = r.AppID;
                notifi.TieuDe = r.TieuDe;
                notifi.Noidung = r.NoiDung;
                notifi.Thoigiangui = r.ThoiGianGui;
                notifi.ThoiHan = r.ThoiHanToiDa;
                notifi.DoUuTien = r.DoUuTien;
                notifi.Trangthai = r.TrangThaiGoi;
                notifi.Soluong = r.SoLuong;
                notifi.SendUser = r.Send_User;
                notifi.SendTag = r.Send_Tag;
                notifi.DeniedUser = r.Send_UserDenie;
                notifi.DeniedTag = r.Send_TagDenie;
                return notifi;
            });
            return notifis;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    public getLastNoti(): Promise<Notifi> {
        let queryText = 'select * from test."n_Notifications" order by "NotifiID" desc limit 1';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText)
            .then(result => {
                let notifi = new Notifi();
                notifi.NotifiID = result.rows[0].NotifiID;
                notifi.AppID = result.rows[0].AppID;
                notifi.TieuDe = result.rows[0].TieuDe;
                notifi.Noidung = result.rows[0].Noidung;
                notifi.Thoigiangui = result.rows[0].Thoigiangui;
                notifi.ThoiHan = result.rows[0].ThoiHan;
                notifi.DoUuTien = result.rows[0].DoUuTien;
                notifi.Trangthai = result.rows[0].Trangthai;
                notifi.Soluong = result.rows[0].Soluong;
                notifi.SendUser = result.rows[0].SendUser;
                notifi.SendTag = result.rows[0].SendTag;
                notifi.DeniedUser = result.rows[0].DeniedUser;
                notifi.DeniedTag = result.rows[0].DeniedTag;
                return notifi;
            })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    public getSL(option):Promise<SLSend[]>{
        let queryText = 'SELECT "NotifiID",COUNT(*) FROM test."Contacts" A,test."n_Notifications" B WHERE (Array[A."ContactID"] && B."Send_User" OR A."Contact_TagID" && B."Send_Tag") AND (Array[A."ContactID"] && B."Send_UserDenie" OR A."Contact_TagID" && B."Send_TagDenie") = false GROUP BY "NotifiID"';

        console.info('Excute: ' + queryText);
        let pResult;
        if (option.NotifiID == undefined) {
            pResult = this._pgPool.query(queryText)
        }
        return pResult.then(result => {
            let slsends: SLSend[] = result.rows.map(r => {
                let slsend = new SLSend();
                slsend.NotifiID = r.NotifiID;
                slsend.count = r.count;
                return slsend;
            });
            return slsends;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });

    }
    public getSLDenied(option):Promise<SLSend[]>{
        let queryText = 'SELECT "NotifiID",COUNT(*) FROM test."Contacts" A,test."n_Notifications" B WHERE (Array[A."ContactID"] && B."Send_UserDenie" OR A."Contact_TagID" && B."Send_TagDenie") = false GROUP BY "NotifiID"';

        console.info('Excute: ' + queryText);
        let pResult;
        if (option.NotifiID == undefined) {
            pResult = this._pgPool.query(queryText)
        }
        return pResult.then(result => {
            let slsends: SLSend[] = result.rows.map(r => {
                let slsend = new SLSend();
                slsend.NotifiID = r.NotifiID;
                slsend.count = r.count;
                return slsend;
            });
            return slsends;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });

    }
    public getslsend(option): Promise<number> {
        let queryText = 'SELECT COUNT(*) FROM test."Contacts" A WHERE (Array[A."ContactID"] && $1 OR A."Contact_TagID" && $2) AND (Array[A."ContactID"] && $3 OR A."Contact_TagID" && $4) = false';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText,[option.contact,option.tag,option.contactdenied,option.tagdenied])
            .then(result => {
                let slsend:number;
                slsend = result.rows[0].count;
                return slsend;
            })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
    public getslsenddenied(option): Promise<number> {
        let queryText = 'SELECT COUNT(*) FROM test."Contacts" A WHERE (Array[A."ContactID"] && $1 OR A."Contact_TagID" && $2) = false';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText,[option.contactdenied,option.tagdenied])
            .then(result => {
                let slsend:number;
                slsend = result.rows[0].count;
                return slsend;
            })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
    public getSentUser(option):Promise<SentUser[]>{
        let queryText = 'SELECT "NotifiID","ContactID","TaiKhoan","Device","Email","FaceBook" FROM test."Contacts" A,test."n_Notifications" B WHERE (Array[A."ContactID"] && B."Send_User" OR A."Contact_TagID" && B."Send_Tag") AND (Array[A."ContactID"] && B."Send_UserDenie" OR A."Contact_TagID" && B."Send_TagDenie") = false';

        console.info('Excute: ' + queryText);
        let pResult;
        if (option.NotifiID == undefined) {
            pResult = this._pgPool.query(queryText)
        }
        return pResult.then(result => {
            let sents: SentUser[] = result.rows.map(r => {
                let sent = new SentUser();
                sent.NotifiID=r.NotifiID;
                sent.ContactID = r.ContactID;
                sent.TaiKhoan = r.TaiKhoan;
                sent.Device = r.Device;
                sent.Email = r.Email;
                sent.FaceBook = r.FaceBook;
                return sent;
            });
            return sents;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
    public getSentUserDenied(option):Promise<SentUser[]>{
        let queryText = 'SELECT "NotifiID","ContactID","TaiKhoan","Device","Email","FaceBook" FROM test."Contacts" A,test."n_Notifications" B WHERE (Array[A."ContactID"] && B."Send_UserDenie" OR A."Contact_TagID" && B."Send_TagDenie") = false';

        console.info('Excute: ' + queryText);
        let pResult;
        if (option.NotifiID == undefined) {
            pResult = this._pgPool.query(queryText)
        }
        return pResult.then(result => {
            let sents: SentUser[] = result.rows.map(r => {
                let sent = new SentUser();
                sent.NotifiID=r.NotifiID;
                sent.ContactID = r.ContactID;
                sent.TaiKhoan = r.TaiKhoan;
                sent.Device = r.Device;
                sent.Email = r.Email;
                sent.FaceBook = r.FaceBook;
                return sent;
            });
            return sents;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    public getOneNoti(option): Promise<Notifi> {
        let queryText = 'select * from test."n_Notifications" where "NotifiID" = $1';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [option.id])
            .then(result => {
                let notifi = new Notifi();
                notifi.NotifiID = result.rows[0].NotifiID;
                notifi.AppID = result.rows[0].AppID;
                notifi.TieuDe = result.rows[0].TieuDe;
                notifi.Noidung = result.rows[0].Noidung;
                notifi.Thoigiangui = result.rows[0].Thoigiangui;
                notifi.ThoiHan = result.rows[0].ThoiHan;
                notifi.DoUuTien = result.rows[0].DoUuTien;
                notifi.Trangthai = result.rows[0].Trangthai;
                notifi.Soluong = result.rows[0].Soluong;
                notifi.SendUser = result.rows[0].SendUser;
                notifi.SendTag = result.rows[0].SendTag;
                notifi.DeniedUser = result.rows[0].DeniedUser;
                notifi.DeniedTag = result.rows[0].DeniedTag;
                return notifi;
            })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
}