

// đây là vùng import tất cả các modules bên ngoài
import * as express from 'express';
import * as body_parser from 'body-parser';


// khai báo app chính
let app = express();

// sử dụng các middleware
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());


// import router
import { BookRouter } from './routes/book.router';
import { UsersRouter } from './routes/users.router';
import { SettingRouter } from './routes/setting.router'
import { TagRouter } from './routes/tag.router'
import { ContactRouter } from './routes/contact.router'


// sử dụng các router được định nghĩa từ các modules
app.use('/api', [(new BookRouter()).getRouter(),
    (new UsersRouter()).getRouter(),
    (new SettingRouter()).getRouter(),
    (new TagRouter()).getRouter(),
    (new ContactRouter()).getRouter()
]);

export default app;
