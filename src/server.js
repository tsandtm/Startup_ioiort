"use strict";
var app_1 = require('./api/app');
var express = require('express');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, 'config', 'server.config.json'))[env];
// load module dùng để khai báo các đường dẫn
var loadModule_middleware_1 = require('./loadModule.middleware');
// dùng để load file index.html
app_1.default.use(express.static(path.join(__dirname, 'client')));
// load các file trong thư mục app theo đường dẫn là /app, ở đây dùng để load file main.ts
app_1.default.use('/app', express.static(path.join(__dirname, 'client')));
// load các file script được ghi trong file index.html với đường dẫn là /scripts
app_1.default.use('/scripts', loadModule_middleware_1.javaScripts);
// load các file @angular được khai báo trong systemjs.config.js
app_1.default.use('/scripts', loadModule_middleware_1.angularModule);
// load các file thư viện khác được khai báo trong systemjs.config.js
app_1.default.use('/scripts', loadModule_middleware_1.othersLib);
// load các file css cho client
app_1.default.use('/css', loadModule_middleware_1.cssFiles);
// load các file html cho client
app_1.default.use(loadModule_middleware_1.htmlFiles);
// trả về index.html
app_1.default.get('/', function (req, res) {
    res.sendFile('index.html');
});
app_1.default.listen(config.port);
console.log('server start on port ' + config.port);
console.log(path.join(__dirname, '..', 'node_modules', 'core-js', 'client'));
