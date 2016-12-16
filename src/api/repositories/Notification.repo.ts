import { RepoBase } from './repositories.base';
import { Notification } from '../models/Notification.model'
import { Pool, QueryResult } from 'pg';

export class NotificationRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Notification[]> {
        let queryText = 'select * from public."n_Notifications" ';
        let pResult;

        if (option.Notification_Tag != undefined) {
            pResult = this._pgPool.query(queryText + 'where "Notification_Tag" = ' + "'{" + option.Notification_Tag + "}'")

            console.info(option.Notification_Tag)
        } else {
            pResult = this._pgPool.query(queryText)
        }


        return pResult.then(result => {
            let Notifications: Notification[] = result.rows.map(r => {
                let notification = new Notification();
                notification.TieuDe = r.TieuDe;
                notification.TrangThaiGoi = r.TrangThaiGoi;
                notification.ThoiGianGui = r.ThoiGianGui;
                notification.SoLuong = r.SoLuong;
                notification.ThoiHanToiDa = r.ThoiHanToiDa;  
                return notification;
            });
            return Notifications;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
    public getListPT(option): Promise<Notification[]> {
        let queryText = 'SELECT * FROM  public."n_Notifications"  LIMIT 15  OFFSET $1;';
        let pResult;
        console.log(queryText+''+option);

        pResult = this._pgPool.query(queryText,[option]);


        return pResult.then(result => {
            let Notifications: Notification[] = result.rows.map(r => {
                let notification = new Notification();
                notification.TieuDe = r.TieuDe;
                notification.TrangThaiGoi = r.TrangThaiGoi;
                notification.ThoiGianGui = r.ThoiGianGui;
                notification.SoLuong = r.SoLuong;
                notification.ThoiHanToiDa = r.ThoiHanToiDa;  
                return notification;
            });
            return Notifications;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
    public getOne(option): Promise<Notification> {
        let queryText = 'select * from public."n_Notifications" where "Notification_Tag" = $1';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [option.Notification_Tag])
            .then(result => {
                let notification = new Notification();
                notification.TieuDe = result.rows[0].TieuDe;
                notification.TrangThaiGoi = result.rows[0].TrangThaiGoi;
                notification.ThoiGianGui = result.rows[0].ThoiGianGui;
                notification.SoLuong = result.rows[0].SoLuong;
                notification.ThoiHanToiDa = result.rows[0].ThoiHanToiDa;
                
                return notification;
            });
    }

    // public count(option): Promise<number> {
    //     let queryText = 'select count(*) as abc from test.books';

    //     console.info('Excute: ' + queryText);

    //     return this._pgPool.query(queryText)
    //         .then(result => {
    //             return result.rows[0].abc
    //         })
    // }
}