import { Promise } from 'es6-promise'
import * as pg from 'pg';
import path = require('path');
let env = process.env.NODE_ENV || 'development';
let config = require(path.join(__dirname,'..','config','database.config.json'))[env];


var connectString = ('postgres://' + config.username + ':' + config.password + '@' + config.host + '/postgres');
pg.connect(connectString, (err,client,done) => {
    if(err){
        console.error(err.message)
        done(err);
        return;
    }

    client.query('CREATE SCHEMA IF NOT EXISTS ' + config.schema)
        .then(() => {
            console.log('Created schema ' + config.schema)
        })
        .catch(err => {
            console.error(err.message);
            done(err);
        })
})