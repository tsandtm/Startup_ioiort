"use strict";
// đây là vùng import tất cả các modules bên ngoài
var express_1 = require('express');
// import các module tạo table
var app_repo_1 = require('../repositories/app.repo');
var AppRouter = (function () {
    function AppRouter() {
        var _this = this;
        this.getAllapp = function (req, res) {
            var option = { IsActive: req.query.IsActive };
            _this.appRepo.getList(option)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.router = express_1.Router();
        this.appRepo = new app_repo_1.AppRepo();
    }
    AppRouter.prototype.getRouter = function () {
        this.router.route('/app')
            .get(this.getAllapp);
        // .post(this.createAContact)
        // .delete(this.deleteAContact);
        return this.router;
    };
    return AppRouter;
}());
exports.AppRouter = AppRouter;
