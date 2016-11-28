import { RepoBase } from './repositories.base';
import { Appkey } from '../models/app.model'
import { Pool, QueryResult } from 'pg';

export class AppRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Appkey[]> {
        let queryText = 'select * from test."n_App" where "IsActive"=true';

        console.info('Excute: ' + queryText);
        let pResult;
            pResult = this._pgPool.query(queryText)

        return pResult.then(result => {
            let apps: Appkey[] = result.rows.map(r => {
                let app = new Appkey();
                app.AppID = r.AppID;
                app.APIKey = r.APIKey;
                app.AppName = r.AppName;
                app.IsActive = r.IsActive;
                app.NgayTao = r.NgayTao;
                return app;
            });
            return apps;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    public getOne(option): Promise<Appkey> {
        let queryText = 'select * from test."n_App" where AppID=$1';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [option.id])
            .then(result => {
                let app = new Appkey();
                app.AppID = result.rows[0].AppID;
                app.APIKey = result.rows[0].APIKey;
                app.AppName = result.rows[0].AppName;
                app.IsActive = result.rows[0].IsActive;
                app.NgayTao = result.rows[0].NgayTao;
                return app;
            });
    }
}