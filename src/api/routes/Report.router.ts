// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';

import path = require('path');
// import các module tạo table
import { ReportRepo } from '../repositories/Report.repo';


export class ReportRouter {

    private router: Router;
    private reportRepo: ReportRepo;

    constructor() {
        this.router = Router();
        this.reportRepo = new ReportRepo();
    }


    public getRouter(): Router {

        this.router.route('/Report')
            .get(this.getAllReport)
        this.router.route('/ReportDevice')
            .get(this.getAllforDougnut)
        // .post(this.createAContact)
        // .delete(this.deleteAContact);

        return this.router;
    }

    private getAllReport = (req: Request, res: Response) => {
        let my: string = req.query.Date;
        let option;
        if (my != null) {
            let arraymy = my.split(";");
            console.log('end split');
            let month: string;
            let year: string;
            if (arraymy.length == 1) {
                year = arraymy[0];
            } else {
                month = arraymy[0];
                year = arraymy[1];
            }
            option = { month: month, year: year };
        } else {
            option = {};
        }

        console.log(option);

        this.reportRepo.getList(option)
            .then(result => {
                res.status(200).json(result)
                console.log(result);
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }
    private getAllforDougnut = (req: Request, res: Response) => {
        this.reportRepo.getAlldougnut()
            .then(result => {
                res.status(200).json(result)
                console.log(result);
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }

    // private createAContact = (req, res) => {
    //     res.send('created')
    // }

    // private deleteAContact = (req, res) => {
    //     res.send('deleted')
    // }

}



// cấu hình router với url mình muốn (ở đây là /book => localhost:port/api/book)
// router.route('/book')
//     //lay het sach, hoac lay sach theo id
//     .get(getAllBook)

//     //tao 1 book
//     .post((req, res) => {
//         bookModel.create(req.body).then(b => {
//             res.json(b);
//         })
//             .catch(error => {
//                 res.status(500).send(error.message);
//             })
//     })

//     //sua 1 sach theo id
//     .put((req, res) => {
//         let id = req.query.id;
//         bookModel.findById(id).then(b => {
//             if (b) {
//                 return b.update(req.body);
//             } else {
//                 return null;
//             }

//         })
//             .then(b => {
//                 if (b) {
//                     res.json(b);
//                 } else {
//                     res.status(404).send('khong tim thay sach voi id =' + id);
//                 }
//             })
//             .catch(error => {
//                 res.status(500).send(error.message);
//             })
//     })

//     //delete a book by id
//     .delete((req, res) => {
//         bookModel.findById(req.query.id).then(b => {
//             if (b) {
//                 b.destroy();
//                 return b.name;
//             } else {
//                 return null;
//             }

//         })
//             .then((v) => {
//                 if (v) {
//                     res.status(200).send('sach ' + v + ' da duoc huy');
//                 } else {
//                     res.status(404).send('khong tim thay sach');
//                 }

//             })
//             .catch(error => {
//                 res.status(500).send(error.message);
//             })
//     });

// // route test quan he        
// router.route('/bookAuthor')

//     // lay tat ca author cua sach
//     .get((req, res) => {
//         let id = req.query.id;
//         bookModel.findById(id).then(book => {
//             if (book) {
//                 book.getAuthors().then(authors => {
//                     res.json(authors);
//                 })
//             }
//             else {
//                 res.status(404).send('khong tim thay book voi id=' + id);
//             }
//         })
//             .catch(error => {
//                 res.status(500).send(error.message);
//             })
//     })


//     // tao them author cho sach
//     .put((req, res) => {
//         let id = req.query.id;
//         bookModel.findById(id).then(book => {
//             if (book) {
//                 let authorName = req.body.name;
//                 book.createAuthor({ name: authorName })
//                 res.status(200).send('da tao them author vao book');
//             } else {
//                 res.status(404).send('khong tim thay book voi id=' + id);
//             }
//         })
//             .catch(error => {
//                 res.status(500).send(error.message);
//             })
//     })




