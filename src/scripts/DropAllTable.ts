import * as pg from 'pg';
import * as fs from 'fs';
import * as path from 'path';
let env = process.env.NODE_ENV || 'development';
let config = require(path.join(__dirname, '..', 'config', 'database.config.json'))[env];



pg.connect('postgres://' + config.username + ':' + config.password + '@' + config.host + '/' + config.database, (err, client, done) => {
    if (err) {
        console.error('error:', err);
        process.exit(1);
    }

    client.query('DROP SCHEMA ' + config.schema + ' CASCADE')
        .then(() => {
            return client.query('CREATE SCHEMA ' + config.schema);
        })
        .catch(err => {
            console.error('Error: ', err);
            process.exit(1);
        })
        .then(() => {
            done();
        });
});