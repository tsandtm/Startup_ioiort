import { Router, Response, Request } from 'express';

// import các module tạo table



export class AboutRouter {

    private router: Router;

    constructor() {
        this.router = Router();
    }

    /**
     * GetRouter
     */
    public GetRouter(): Router {
        this.router.route('/')
            .get(this.Get)
        return this.router;
    }


    private Get(req: Request, res: Response) {
        return res.send(200).json({ Message: "File Log to Server", About: "Bựa team" })
    }
}