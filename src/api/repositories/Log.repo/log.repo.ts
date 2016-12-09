import { RepoBase } from '../repositories.base';
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
                return console.log(`Đã Insert`)
            })
            .catch(err => {
                return console.log(err)
            })
    }
}