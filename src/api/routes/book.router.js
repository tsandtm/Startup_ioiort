"use strict";
// đây là vùng import tất cả các modules bên ngoài
var express_1 = require('express');
var path = require('path');
// import các module tạo table
var book_repo_1 = require('../repositories/book.repo');
var mockProduct = require(path.join(__dirname, '..', 'json', 'products.json'));
var BookRouter = (function () {
    function BookRouter() {
        var _this = this;
        this.getAllBook = function (req, res) {
            res.status(200).json(mockProduct);
            // let object={ id: 1, name: 'book1' };
            // this.bookRepo.getList(null)
            //     .then(result => {
            //         res.status(200).json(result)
            //     })
            //     .catch(error => {
            //         console.error(error.message);
            //         res.status(500).send(error.message)
            //     })
        };
        this.countBook = function (req, res) {
            _this.bookRepo.count(null)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.createABook = function (req, res) {
            res.send('created');
        };
        this.deleteABook = function (req, res) {
            res.send('deleted');
        };
        this.router = express_1.Router();
        this.bookRepo = new book_repo_1.BookRepo();
        //this.model = model;
    }
    BookRouter.prototype.getRouter = function () {
        this.router.route('/book')
            .get(this.getAllBook)
            .post(this.createABook)
            .delete(this.deleteABook);
        this.router.get('/countBook', this.countBook);
        return this.router;
    };
    return BookRouter;
}());
exports.BookRouter = BookRouter;
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