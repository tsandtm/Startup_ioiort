"use strict";
// đây là vùng import tất cả các modules bên ngoài
var express = require('express');
var body_parser = require('body-parser');
// khai báo app chính
var app = express();
// sử dụng các middleware
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
var book_router_1 = require('./routes/book.router');
var Report_router_1 = require('./routes/Report.router');
var contacts_router_1 = require('./routes/contacts.router');
var notifications_router_1 = require('./routes/notifications.router');
var yeucauban_router_1 = require('./routes/yeucauban.router');
// sử dụng các router được định nghĩa từ các modules
app.use('/api', [(new book_router_1.BookRouter()).getRouter()]);
app.use('/api', [(new contacts_router_1.ContactsRouter()).getRouter()]);
app.use('/api', [(new notifications_router_1.NotificationsRouter()).getRouter()]);
app.use('/api', [(new yeucauban_router_1.YeucaubanRouter()).getRouter()]);
app.use('/api', [(new Report_router_1.ReportRouter()).getRouter()]);
exports.__esModule = true;
exports["default"] = app;
