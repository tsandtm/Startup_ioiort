"use strict";
// import * as Sequelize from 'sequelize';
var path = require('path');
var pg_pool_1 = require('./pg-pool');
var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '..', '..', 'config', 'database.config.json'))[env];
var RepoBase = (function () {
    function RepoBase() {
        this._pgPool = pg_pool_1.PgPool.getPool();
    }
    return RepoBase;
}());
exports.RepoBase = RepoBase;
