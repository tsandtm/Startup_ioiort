import { RepoBase } from './repositories.base';
import { ListWeb } from '../models/website.model'
import { Pool, QueryResult } from 'pg';

export class ListWebRepo extends RepoBase {

    constructor() {
        super();
    }
     public getList(option): Promise<ListWeb[]> {
        let queryText = 'select * from "danhmuc" where show = false order by name asc';

        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, 
            [option.id, 
            option.name, 
            option.icon,
            option.show
            ])
        } else {
            pResult = this._pgPool.query(queryText)
        }
        return pResult.then(result => {
            let webs: ListWeb[] = result.rows.map(r => {
                let web = new ListWeb();
                web.id = r.id;
                web.name = r.name;
                web.icon = r.icon;
                web.show = r.show;
                return web;
            });
            return webs;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    public getListShow(option): Promise<ListWeb[]> {
            let queryText = 'select * from "danhmuc" where show = true order by name asc';

            console.info('Excute: ' + queryText);
            let pResult;

            if (option) {
                pResult = this._pgPool.query(queryText, 
                [option.id, 
                option.name, 
                option.icon,
                option.show
                ])
            } else {
                pResult = this._pgPool.query(queryText)
            }
            return pResult.then(result => {
                let webs: ListWeb[] = result.rows.map(r => {
                    let web = new ListWeb();
                    web.id = r.id;
                    web.name = r.name;
                    web.icon = r.icon;
                    web.show = r.show;
                    return web;
                });
                return webs;
            })
                .catch(err => {
                    console.error(err.message);
                    return null;
                });
        }

        public UpdateShow(id : number,value): Promise<ListWeb> {
        let queryText = 'update "danhmuc" set show = $1 where id=$2';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [value.show,id])
            .then(result => { 
                let webs = new ListWeb();
                webs.id = id;
                console.log('rows: ' + JSON.stringify(result.rows))
                return webs;
            })
            .catch(error => {
                    console.error('Error: ',error);
                    return Promise.reject(error);
                })
        }


     public count(option): Promise<number> {
        let queryText = 'select count(*) as abc from news';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText)
            .then(result => {
                return result.rows[0].abc
            })
    }
   
}