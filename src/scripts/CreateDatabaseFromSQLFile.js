"use strict";
var pg = require('pg');
var fs = require('fs');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '..', 'config', 'database.config.json'))[env];
var sql = fs.readFileSync(path.join(__dirname, '..', '..', 'doc', 'script.sql')).toString();
pg.connect('postgres://' + config.username + ':' + config.password + '@' + config.host + '/' + config.database, function (err, client, done) {
    if (err) {
        console.error('error:', err);
        process.exit(1);
    }
    client.query(sql, function (err, result) {
        done();
        if (err) {
            console.error('error: ', err);
            process.exit(1);
        }
        process.exit(0);
    });
});
