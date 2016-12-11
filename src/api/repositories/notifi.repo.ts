import { RepoBase } from './repositories.base';
import { Notifi,SentUser,UpdateData,InsertUser } from '../models/notifi.model'
import { Pool, QueryResult } from 'pg';

export class NotifiRepo extends RepoBase {

    constructor() {
        super();
    }

    public Create(option): Promise<Notifi> {
        let queryText = 'INSERT INTO test."n_Notifications" values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)';

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
        option.SendUserName,
        option.SendTag,
        option.SendTagName,
        option.DeniedUser,
        option.DeniedUserName,
        option.DeniedTag,
        option.DeniedTagName,
        option.ThoiHanNum,
        option.ThoiHanDV,
        option.SendLater
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
                notifi.SendUser = r.Send_UserID;
                notifi.SendUserName = r.Send_UserName;
                notifi.SendTag = r.Send_TagID;
                notifi.SendTagName = r.Send_TagName;
                notifi.DeniedUser = r.Send_UserDenieID;
                notifi.DeniedUserName = r.Send_UserDenieName;
                notifi.DeniedTag = r.Send_TagDenieID;
                notifi.DeniedTagName = r.Send_TagDenieName;
                notifi.ThoiHanNum=r.ThoiHanNum;
                notifi.ThoiHanDV=r.ThoiHanDV;
                notifi.SendLater=r.SendLater;
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
                notifi.SendUserName = result.rows[0].SendUserName;
                notifi.SendTag = result.rows[0].SendTag;
                notifi.SendTagName = result.rows[0].SendTagName;
                notifi.DeniedUser = result.rows[0].DeniedUser;
                notifi.DeniedUserName = result.rows[0].DeniedUserName;
                notifi.DeniedTag = result.rows[0].DeniedTag;
                notifi.DeniedTagName = result.rows[0].DeniedTagName;
                notifi.ThoiHanNum=result.rows[0].ThoiHanNum;
                notifi.ThoiHanDV=result.rows[0].ThoiHanDV;
                notifi.SendLater=result.rows[0].SendLater;
                return notifi;
            })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    public getSL(option):Promise<number>{
        let queryText = 'SELECT COUNT(*) FROM test."Contacts" A,test."n_Notifications" B WHERE "NotifiID"=$1 AND (Array[A."ContactID"] && B."Send_UserID" OR A."Contact_TagID" && B."Send_TagID") AND (Array[A."ContactID"] && B."Send_UserDenieID" OR A."Contact_TagID" && B."Send_TagDenieID") = false GROUP BY "NotifiID"';

        console.info('Excute: ' + queryText);
        let pResult;
            pResult = this._pgPool.query(queryText,[option.id])
        return pResult.then(result => {
                let sl:number;
                if(result.rowCount==0)
                    sl=0;
                else
                    sl = result.rows[0].count;
                return sl;
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
    public getSentUser(option):Promise<SentUser[]>{
        let queryText = 'SELECT "NotifiID","ContactID","TaiKhoan","Device","Email","FaceBook","Contact_TagName" FROM test."Contacts" A,test."n_Notifications" B WHERE (Array[A."ContactID"] && B."Send_UserID" OR A."Contact_TagID" && B."Send_TagID") AND (Array[A."ContactID"] && B."Send_UserDenieID" OR A."Contact_TagID" && B."Send_TagDenieID") = false AND "NotifiID" = $1 ORDER BY "ContactID" ASC LIMIT 10 ';

        console.info('Excute: ' + queryText);
        let pResult;
            pResult = this._pgPool.query(queryText,[option.id]);
        return pResult.then(result => {
            let sents: SentUser[] = result.rows.map(r => {
                let sent = new SentUser();
                sent.NotifiID=r.NotifiID;
                sent.ContactID = r.ContactID;
                sent.TaiKhoan = r.TaiKhoan;
                sent.Device = r.Device;
                sent.Email = r.Email;
                sent.FaceBook = r.FaceBook;
                sent.ContactTagName=r.Contact_TagName;
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
                notifi.SendUserName = result.rows[0].SendUserName;
                notifi.SendTag = result.rows[0].SendTag;
                notifi.SendTagName = result.rows[0].SendTagName;
                notifi.DeniedUser = result.rows[0].DeniedUser;
                notifi.DeniedUserName = result.rows[0].DeniedUserName;
                notifi.DeniedTag = result.rows[0].DeniedTag;
                notifi.DeniedTagName = result.rows[0].DeniedTagName;
                notifi.ThoiHanNum=result.rows[0].ThoiHanNum;
                notifi.ThoiHanDV=result.rows[0].ThoiHanDV;
                notifi.SendLater=result.rows[0].SendLater;
                return notifi;
            })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
}