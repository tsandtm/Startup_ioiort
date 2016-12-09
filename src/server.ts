import app from './api/app';
import * as express from 'express';
import path = require('path');
let env = process.env.NODE_ENV || 'development';
let config = require(path.join(__dirname, 'config', 'server.config.json'))[env];
// load module dùng để khai báo các đường dẫn



// dùng để load file index.html
app.use(express.static(path.join(__dirname, 'client')))

// load các file trong thư mục app theo đường dẫn là /app, ở đây dùng để load file main.ts
app.use('/app', express.static(path.join(__dirname, 'client')))

// trả về index.html
app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.listen(config.port);
console.log('server start on port ' + config.port)
console.log(path.join(__dirname, '..', 'node_modules', 'core-js', 'client'))