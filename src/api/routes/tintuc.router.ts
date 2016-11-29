// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';

// import các module tạo table
import { News } from '../repositories/tintuc.repo';





export class NewsRouter {

    private router: Router;
    private NewsRepo: News;

    constructor() {
        this.router = Router();
        this.NewsRepo = new News();
    }


    public getRouter(): Router {

        this.router.route('/tintuc')
            .get(this.GetAllNews)

        return this.router;
    }

    private GetAllNews = (req: Request, res: Response) => {
        this.NewsRepo.getList().then(result=>{
            res.status(200).json(result)
        }).catch(err=> {
            console.error(err)
            res.status(500).send({Message:Error})
        })
   
    }

 

}





