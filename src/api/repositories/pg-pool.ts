import { Pool, Client } from 'pg';
import path = require('path');
let env = process.env.NODE_ENV || 'development';
let config = require(path.join(__dirname, '..', '..', 'config', 'database.config.json'))[env];
export abstract class PgPool {

    private static _pgPool: Pool;
    private static count: number = 0;
    private static count2: number = 0;

    public constructor() {
    }

    public static getPool(): Promise<Client> {
        if (!this._pgPool) {
            console.log('pg-pool create the first time');
            this._pgPool = new Pool({
                database: config.database,
                user: config.username,
                password: config.password,
                port: config.port,
                max: config.pool.max,
                min: config.pool.min,
                idleTimeoutMillis: config.idleTimeoutMillis,
                host: config.host
            });
           this.Listen()
           return this._pgPool.connect();
        }
        return this._pgPool.connect()
    }

    public static Listen() {
        this._pgPool.on('error', (err, client) => {
            this._pgPool.end()
            console.error(err.message);
            console.info(client);
        });

        this._pgPool.on('connect', (client) => {
            console.info(`User connect`)
            this.count++
            console.info(this.count);
        })
        this._pgPool.on('acquire', client => {
            console.info(`User đã thoát`)
            this.count2++
            console.info(this.count)
        })
        this._pgPool.on('drain' , ()=>{
            this._pgPool.end().then(()=>{
                console.log('Đã đóng pool')
            })
        })
    }
}