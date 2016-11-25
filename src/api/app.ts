

// đây là vùng import tất cả các modules bên ngoài
import * as express from 'express';
import * as body_parser from 'body-parser';


// khai báo app chính
let app = express();

// sử dụng các middleware
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// import router
import {BookRouter} from './routes/book.router';
import{TinTucRouter}from './routes/tintuc.router';
import{DanhMucRouter}from'./routes/danhmuc.router';

// sử dụng các router được định nghĩa từ các modules
app.use('/api', [(new BookRouter()).getRouter()],[(new TinTucRouter()).getRouter()],[(new DanhMucRouter()).getRouter()]);

export default app;
