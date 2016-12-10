"use strict";
// đây là vùng import tất cả các modules bên ngoài
var express_1 = require('express');
// import các module tạo table
var setting_repo_1 = require('../repositories/setting.repo');
var SettingRouter = (function () {
    function SettingRouter() {
        var _this = this;
        this.getAllSetting = function (req, res) {
            console.log('abc' + req.body);
            _this.settingRepo.getList(req.body)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
            // this.bookRepo.getList(null)
            //     .then(result => {
            //         res.status(200).json(result)
            //     })
            //     .catch(error => {
            //         console.error(error.message);
            //         res.status(500).send(error.message)
            //     })
        };
        this.Create = function (req, res) {
            _this.settingRepo.Create(req.body)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.Delete = function (req, res) {
            _this.settingRepo.Delete(req.body)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.Edit = function (req, res) {
            _this.settingRepo.Edit(req.body)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.router = express_1.Router();
        this.settingRepo = new setting_repo_1.SettingRepo();
        //this.model = model;
    }
    SettingRouter.prototype.getRouter = function () {
        console.log('abc');
        this.router.route('/setting')
            .get(this.getAllSetting)
            .post(this.Create);
        this.router.route("/settingedit")
            .post(this.Edit);
        this.router.route("/settingdelete")
            .post(this.Delete);
        return this.router;
    };
    return SettingRouter;
}());
exports.SettingRouter = SettingRouter;
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
