"use strict";
// đây là vùng import tất cả các modules bên ngoài
var express_1 = require('express');
// import các module tạo table
var notifi_repo_1 = require('../repositories/notifi.repo');
var NotifiRouter = (function () {
    function NotifiRouter() {
        var _this = this;
        this.Create = function (req, res) {
            _this.notifiRepo.Create(req.body)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.Update = function (req, res) {
            _this.notifiRepo.Update(req.body)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.Insert = function (req, res) {
            _this.notifiRepo.Insert(req.body)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.getAllNoti = function (req, res) {
            _this.notifiRepo.getAllNoti(req.body)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.getLastNoti = function (req, res) {
            _this.notifiRepo.getLastNoti()
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.getSL = function (req, res) {
            _this.notifiRepo.getSL(req.body)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.getSLsend = function (req, res) {
            _this.notifiRepo.getslsend(req.body)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.getSentUser = function (req, res) {
            _this.notifiRepo.getSentUser(req.params)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.router = express_1.Router();
        this.notifiRepo = new notifi_repo_1.NotifiRepo();
    }
    NotifiRouter.prototype.getRouter = function () {
        this.router.route('/notifi')
            .get(this.getLastNoti)
            .post(this.Create);
        // .delete(this.deleteAContact);
        this.router.route("/notifigetone")
            .get(this.getAllNoti)
            .post(this.Update);
        this.router.route("/sl")
            .get(this.getSL)
            .post(this.getSLsend);
        this.router.route("/sentuser/:id?")
            .get(this.getSentUser)
            .post(this.Insert);
        return this.router;
    };
    return NotifiRouter;
}());
exports.NotifiRouter = NotifiRouter;
