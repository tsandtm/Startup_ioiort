import * as pg from 'pg';
import path = require('path');
let env = process.env.NODE_ENV || 'development';
let config = require(path.join(__dirname,'..','config','database.config.json'))[env];

var connectString = ('postgres://' + config.username + ':' + config.password + '@' + config.host + '/postgres');

pg.connect(connectString,(err,client,done) => {
    if(err){
        console.error(err);
        done(err);
        return;
    }

    client.query('DROP SCHEMA ' + config.schema + ' CASCADE')
            .then(() => {
                console.log('DROP SCHEMA')
                client.query('CREATE SCHEMA ' + config.schema)
                    .then(() => {
                        console.log('Create schema')
                    })
                    .catch(err => {
                        console.error(err.message);
                        done(err);
                    })
            })
            .catch(err => {
                console.error(err.message);
                done(err)
            }) 
})