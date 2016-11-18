"use strict";
var express_1 = require('express');
var notifications_repo_1 = require('../repositories/notifications.repo');
//let mockProduct = require(path.join(__dirname,'..','json','products.json'));
var NotificationsRouter = (function () {
    function NotificationsRouter() {
        var _this = this;
        this.getAllNotifications = function (req, res) {
            //  let object={ id: 1, ToKen: 'contact' };
            _this.notificationsRepo.getList(null)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.createANotifications = function (req, res) {
            res.send('created');
        };
        this.router = express_1.Router();
        this.notificationsRepo = new notifications_repo_1.NotificationsRepo();
    }
    NotificationsRouter.prototype.getRouter = function () {
        this.router.route('/notification')
            .get(this.getAllNotifications)
            .get(this.createANotifications);
        return this.router;
    };
    return NotificationsRouter;
}());
exports.NotificationsRouter = NotificationsRouter;
