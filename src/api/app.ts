

// đây là vùng import tất cả các modules bên ngoài
import * as express from 'express';
import * as body_parser from 'body-parser';


// khai báo app chính
let app = express();

// sử dụng các middleware
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', req.header['origin']);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept, Authorization');
  next();
});


// import router
import { LogRouter } from './routes/log.router'
import { AboutRouter } from './routes/about.router'
// sử dụng các router được định nghĩa từ các modules

// import router

app.use('/api/log', new LogRouter().GetRouter())
app.use('/api/check',new AboutRouter().GetRouter())
export default app;
