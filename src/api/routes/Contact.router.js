"use strict";
// đây là vùng import tất cả các modules bên ngoài
var express_1 = require('express');
<<<<<<< HEAD
=======
var Contact_model_1 = require('../models/Contact.model');
>>>>>>> tu-f-notifi-contact
// import các module tạo table
var Contact_repo_1 = require('../repositories/Contact.repo');
var ContactRouter = (function () {
    function ContactRouter() {
        var _this = this;
        this.getAllContact = function (req, res) {
<<<<<<< HEAD
            var option = { Contact_Tag: req.query.Contact_Tag };
=======
            var option = new Contact_model_1.Contact();
            option = req.query;
>>>>>>> tu-f-notifi-contact
            _this.contactRepo.getList(option)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
<<<<<<< HEAD
=======
        this.getOne = function (req, res) {
            var option = { ContactID: req.query.ContactID };
            _this.contactRepo.getOne(option)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.create = function (req, res) {
            var option = new Contact_model_1.Contact();
            option = req.body;
            _this.contactRepo.create(option)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.update = function (req, res) {
            var option = new Contact_model_1.Contact();
            option = req.body;
            _this.contactRepo.update(option)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.orderByTag = function (req, res) {
            var option = new Contact_model_1.Contact();
            option.Contact_TagID = req.query.Contact_TagID;
            _this.contactRepo.orderByTag(option)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
>>>>>>> tu-f-notifi-contact
        this.router = express_1.Router();
        this.contactRepo = new Contact_repo_1.ContactRepo();
    }
    ContactRouter.prototype.getRouter = function () {
        this.router.route('/Contact')
            .get(this.getAllContact);
<<<<<<< HEAD
        // .post(this.createAContact)
        // .delete(this.deleteAContact);
=======
        this.router.route('/Contact/GetOne')
            .get(this.getOne);
        this.router.route('/Contact/Create')
            .post(this.create);
        this.router.route('/Contact/Update')
            .post(this.update);
        this.router.route('/Contact/orderByTag')
            .get(this.orderByTag);
>>>>>>> tu-f-notifi-contact
        return this.router;
    };
    return ContactRouter;
}());
exports.ContactRouter = ContactRouter;
<<<<<<< HEAD
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
=======
>>>>>>> tu-f-notifi-contact
