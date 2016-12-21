// import * as Sequelize from 'sequelize';
import path = require('path');
import { PgPool } from './pg-pool'
import { Pool, QueryResult, Client } from 'pg';
let env = process.env.NODE_ENV || 'development';
let config = require(path.join(__dirname, '..', '..', 'config', 'database.config.json'))[env];

export abstract class RepoBase {

    protected _pgPool: Promise<Client>;

    public constructor() {
        //  this._pgPool = PgPool.getPool();
    }

    /**
     * @function Sẽ mở kết nối khi sử dụng
     * @function sẽ tự đóng kết nối khi mỗi lần nhận kết quả
     */
    public _query = (query: any, option?: any): Promise<QueryResult> => {
            this._pgPool = PgPool.getPool();
        
            if (option) {
                return this._pgPool
                    .then(client => {
                        return client.query(query, option)
                            .then(result => {
                                client.end();
                                return result;
                            })
                            .catch(err => {
                                client.end();
                                console.log(err)
                            })
                    })

                    .catch(err => console.log(err))
            }
            else {
                return this._pgPool
                    .then(client => {
                        return client.query(query)
                            .then(result => {
                                client.end();
                                return result;
                            })
                            .catch(err => {
                                client.end()
                                console.log(err)
                                return (err)
                            })
                    })
                    .catch(err => console.log(err))
            }
        } 

    //public abstract getList(option);
    //public abstract getOne(option);
    // them vai thu nua


}