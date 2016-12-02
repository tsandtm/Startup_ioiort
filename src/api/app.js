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
var app_router_1 = require('./routes/app.router');
var notifi_router_1 = require('./routes/notifi.router');
var tag_router_1 = require('./routes/tag.router');
var Contact_router_1 = require('./routes/Contact.router');
var setting_router_1 = require('./routes/setting.router');
// sử dụng các router được định nghĩa từ các modules
app.use('/api', [(new book_router_1.BookRouter()).getRouter()]);
app.use('/api', [(new contacts_router_1.ContactsRouter()).getRouter()]);
app.use('/api', [(new notifications_router_1.NotificationsRouter()).getRouter()]);
app.use('/api', [(new yeucauban_router_1.YeucaubanRouter()).getRouter()]);
app.use('/api', [(new Report_router_1.ReportRouter()).getRouter()]);
app.use('/api', [(new notifi_router_1.NotifiRouter()).getRouter()]);
app.use('/api', [(new tag_router_1.TagRouter()).getRouter()]);
app.use('/api', [(new Contact_router_1.ContactRouter()).getRouter()]);
app.use('/api', [(new app_router_1.AppRouter()).getRouter()]);
app.use('/api', [(new setting_router_1.SettingRouter()).getRouter()]);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
