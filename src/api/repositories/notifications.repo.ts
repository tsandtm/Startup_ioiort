import { RepoBase } from './repositories.base';
import { Notifications } from '../models/notifications.model'
import { Pool, QueryResult } from 'pg';

export class NotificationsRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Notifications[]> {
        let queryText = 'SELECT * FROM public."n_Notifications"ORDER BY "NotifiID"ASC  ';

        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.TieuDe])
        } else {
            pResult = this._pgPool.query(queryText)
        }


        return pResult.then(result => {
            let notifications: Notifications[] = result.rows.map(r => {
                let notification = new Notifications();
                notification.id = r.NotifiID;
                notification.AppID = r.AppID;
                notification.TieuDe = r.TieuDe;
                notification.NoiDung = r.NoiDung;
                notification.ThoiGianGui = r.ThoiGianGui;
                notification.ThoiHanToiDa = r.ThoiHanToiDa;
                notification.DoUuTien = r.DoUuTien;
                notification.TrangThaiGoi = r.TrangThaiGoi;
                notification.SoLuong = r.SoLuong;
                return notification;
            });
            return notifications;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
 }
 public getOne(option): Promise<Notifications> {
      //  let queryText = 'SELECT "NotifiID", "AppID", "TieuDe", "NoiDung", "ThoiGianGui", "ThoiHanToiDa", "DoUuTien", "TrangThaiGoi", "SoLuong"FROM public."n_Notifications"; where NotifiID=id';
        let queryText = 'SELECT "NotifiID", "AppID", "TieuDe", "NoiDung", "ThoiGianGui", "ThoiHanToiDa", "DoUuTien", "TrangThaiGoi", "SoLuong"FROM public."n_Notifications"; where id=$1';
        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [option.id, option.TieuDe])
            .then(result => {
                let notifications = new Notifications();
                notifications.id = result.rows[0].id;
                notifications.AppID = result.rows[0].AppID;
                notifications.TieuDe = result.rows[0].TieuDe;
                notifications.NoiDung = result.rows[0].NoiDung;
                notifications.ThoiGianGui = result.rows[0].ThoiGianGui;
                notifications.ThoiHanToiDa = result.rows[0].ThoiHanToiDa;
                notifications.DoUuTien = result.rows[0].DoUuTien;
                notifications.TrangThaiGoi = result.rows[0].TrangThaiGoi;
                notifications.SoLuong = result.rows[0].SoLuong;
                return notifications;
            });
    }
}