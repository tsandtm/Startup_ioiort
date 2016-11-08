"use strict";
var pg_1 = require('pg');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '..', '..', 'config', 'database.config.json'))[env];
var PgPool = (function () {
    function PgPool() {
    }
    PgPool.getPool = function () {
        if (!this._pgPool) {
            console.log('pg-pool create the first time');
            this._pgPool = new pg_1.Pool({
                database: config.database,
                user: config.username,
                password: config.password,
                port: config.port,
                ssl: config.ssl,
                max: config.pool.max,
                min: config.pool.min,
                idleTimeoutMillis: config.idleTimeoutMillis
            });
            this._pgPool.on('error', function (err, client) {
                console.error(err.message);
                console.info(client);
            });
        }
        return this._pgPool;
    };
    return PgPool;
}());
exports.PgPool = PgPool;
