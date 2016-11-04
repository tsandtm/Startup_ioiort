"use strict";
// import * as Sequelize from 'sequelize';
var PG = require('pg');
var es6_promise_1 = require('es6-promise');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '..', 'config', 'database.config.json'))[env];
exports.CreateDatabasePG = function () {
    var connectString = ('postgres://' + config.username + ':' + config.password + '@' + config.host + '/postgres');
    return new es6_promise_1.Promise(function (resolve, reject) {
        PG.connect(connectString, function (err, client, done) {
            if (err) {
                console.error(err.message);
                reject(err);
                return;
            }
            client.query("SELECT datname FROM pg_database where datname = " + "'" + config.database + "'", function (err1, result) {
                if (err1) {
                    // console.log(err1);
                    reject(err1);
                    return;
                }
                if (result.rows.length == 0) {
                    client.query('Create Database ' + config.database, function (err2, result) {
                        if (err2) {
                            // console.log(err2);
                            reject(err2);
                            client.end();
                        }
                        resolve('Create Database: ' + config.database);
                        client.end();
                        // console.log('Success: Create Database: ' + config.database);
                    });
                }
                else {
                    resolve('Error: ' + config.database + ' exists');
                    client.end();
                }
            });
            // client.release();
        });
    });
};
exports.CreateDatabasePG();
// CreateDatabasePG((err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });
