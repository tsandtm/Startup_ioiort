import { RepoBase } from './repositories.base';
import { Pool, QueryResult } from 'pg';

export class LogRepo extends RepoBase {

    constructor() {
        super();
    }
    /**
     * InsertOne
     */
    public InsertOne(option): Promise<any> {
        let date = new Date();

        let query = `INSERT INTO public."Log"(
	"NgayTao", "TextLog", "Platform", "UngDung","TieuDeLog")
	VALUES ('${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}', 
    '${option.TextLog}', 
    '${option.Platform}',
    '${option.UngDung}',
    '${option.TieuDeLog}'
    );`;


        return this._pgPool.query(query)
            .then(result => {
                // return console.log(`Đã Insert`)
                return
            })
            .catch(err => {
                // return console.log(err)
                return;
            })
    }

    public GetListbyName(option): Promise<any> {
        let limit = option.limit ? option.limit : 100;
        let offset = option.offset ? option.offset : 0;
        let date = option.NgayTao ? option.NgayTao : new Date().getDate()
        let TieuDeLog = option.TieuDeLog ? option.TieuDeLog : null
        let query = ` SELECT *
                        FROM public."Log"
                        WHERE  lower("TieuDeLog") like lower('%${TieuDeLog}%') AND date_part('day', public."Log"."NgayTao") = ${date}
                        Limit ${limit} offset ${offset}`
        return this._pgPool.query(query)
            .then(result => Promise.resolve(result.rows))
            .catch(err => Promise.reject(err))
    }
}