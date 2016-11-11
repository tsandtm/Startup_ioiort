import { RepoBase } from './repositories.base';
import { ListNews } from '../models/news.model'
import { Pool, QueryResult } from 'pg';

export class ListNewsRepo extends RepoBase {

    constructor() {
        super();
    }
     public getList(option): Promise<ListNews[]> {
        let queryText = 'select * from "news" order by datepub asc';

        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, 
            [option.id, 
            option.name, 
            option.description,
            option.content,
            option.datepub,
            option.imgurl
            ])
        } else {
            pResult = this._pgPool.query(queryText)
        }


        return pResult.then(result => {
            let news: ListNews[] = result.rows.map(r => {
                let nw = new ListNews();
                nw.id = r.id;
                nw.name = r.name;
                nw.description = r.description;
                nw.content= r.content;
                nw.datepub = r.datepub;
                nw.imgurl= r.imgurl;
                return nw;
            });
            return news;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    //  public count(option): Promise<number> {
    //     let queryText = 'select count(*) as abc from news';

    //     console.info('Excute: ' + queryText);

    //     return this._pgPool.query(queryText)
    //         .then(result => {
    //             return result.rows[0].abc
    //         })
    // }

    public DeleteNews(id : number): Promise<ListNews> {
        let queryText = 'delete from "news" where id=$1';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [id])
            .then(result => { 
                let news = new ListNews();
                news.id = id;
                console.log('rows: ' + JSON.stringify(result.rows))
                return news;
            })
            .catch(error => {
                    console.error('Error: ',error);
                    return Promise.reject(error);
                })
        }
   
}