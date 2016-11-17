"use strict";
var express_1 = require('express');
var yeucauban_repo_1 = require('../repositories/yeucauban.repo');
var YeucaubanRouter = (function () {
    function YeucaubanRouter() {
        var _this = this;
        this.getAllYeucauban = function (req, res) {
            _this.yeucaubanRepo.getList(null)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.createYeucauban = function (req, res) {
            res.send('created');
        };
        this.router = express_1.Router();
        this.yeucaubanRepo = new yeucauban_repo_1.YeucaubanRepo();
    }
    YeucaubanRouter.prototype.getRouter = function () {
        this.router.route('/yeucauban')
            .get(this.getAllYeucauban)
            .get(this.createYeucauban);
        return this.router;
    };
    return YeucaubanRouter;
}());
exports.YeucaubanRouter = YeucaubanRouter;
