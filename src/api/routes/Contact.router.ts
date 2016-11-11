// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';
import { Contact } from '../models/Contact.model'

import path = require('path');
// import các module tạo table
import { ContactRepo } from '../repositories/Contact.repo';





export class ContactRouter {

    private router: Router;
    private contactRepo: ContactRepo;

    constructor() {
        this.router = Router();
        this.contactRepo = new ContactRepo();
    }


    public getRouter(): Router {

        this.router.route('/Contact')
            .get(this.getAllContact);
        this.router.route('/Contact/GetOne')
            .get(this.getOne);
        this.router.route('/Contact/Create')
            .post(this.create);
        this.router.route('/Contact/Update')
            .post(this.update);
        return this.router;
    }

    private getAllContact = (req: Request, res: Response) => {
        let option = new Contact();
        option = req.query;

        this.contactRepo.getList(option)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }

    private getOne = (req: Request, res: Response) => {
        let option = { ContactID: req.query.ContactID };

        this.contactRepo.getOne(option)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).send(error.message);
            })
    }

    private create = (req: Request, res: Response) => {
        let option = new Contact();
        option = req.body;

        this.contactRepo.create(option)
            .then((result) => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).send(error.message);
            });
    }

    private update = (req: Request, res: Response) => {
        let option = new Contact();
        option = req.body;
        console.log('update');
        console.log(option);
        console.log(option.Contact_Tag);
        console.log(option.ContactID);

        this.contactRepo.update(option)
            .then((result) => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).send(error.message);
            });
    }



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




