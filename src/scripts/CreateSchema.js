"use strict";
var pg = require('pg');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '..', 'config', 'database.config.json'))[env];
var connectString = ('postgres://' + config.username + ':' + config.password + '@' + config.host + '/' + config.database);
pg.connect(connectString, function (err, client, done) {
    if (err) {
        console.error(err.message);
        done(err);
        return;
    }
    client.query('CREATE SCHEMA IF NOT EXISTS ' + config.schema)
        .then(function () {
        console.log('Created schema ' + config.schema);
        client.end();
    })
        .catch(function (err) {
        console.error(err.message);
        done(err);
        client.end();
    });
});
