

// đây là vùng import tất cả các modules bên ngoài
import * as express from 'express';
import * as body_parser from 'body-parser';
import * as session from 'express-session'
import { config } from '../config/Session.config'
// khai báo app chính
let app = express();

// sử dụng các middleware
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(config);


import { BookRouter } from './routes/book.router';
import { ReportRouter } from './routes/Report.router';
// import { ContactsRouter } from './routes/contacts.router';
import { NotificationsRouter } from './routes/notifications.router';
import { YeucaubanRouter } from './routes/yeucauban.router';
import { AppRouter } from './routes/app.router';
import { NotifiRouter } from './routes/notifi.router';
import { TagRouter } from './routes/tag.router';
import { ContactRouter } from './routes/Contact.router';
import { SettingRouter } from './routes/setting.router';
// import { Login } from './routes/login.router';
import { checkSession } from './routes/checkSession.router';
import { XXXRouter } from "./routes/XXXRouter";

// sử dụng các router được định nghĩa từ các modules
// app.use(new checkSession().GetRoute())
app.use('/api', [(new BookRouter()).getRouter()]);
app.use('/api', [(new NotificationsRouter()).getRouter()]);
app.use('/api', [(new YeucaubanRouter()).getRouter()]);
app.use('/api', [(new ReportRouter()).getRouter()]);
app.use('/api', [(new NotifiRouter()).getRouter()]);
app.use('/api', [(new TagRouter()).getRouter()]);
app.use('/api', [(new ContactRouter()).getRouter()]);
app.use('/api', [(new AppRouter()).getRouter()]);
app.use('/api', [(new SettingRouter()).getRouter()]);
app.use("/api", [(new XXXRouter().GetRouter())]);

export let Store = new session.MemoryStore();
export default app;
