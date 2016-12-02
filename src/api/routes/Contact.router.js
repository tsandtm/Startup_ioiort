"use strict";
// đây là vùng import tất cả các modules bên ngoài
var express_1 = require('express');
var Contact_model_1 = require('../models/Contact.model');
// import các module tạo table
var Contact_repo_1 = require('../repositories/Contact.repo');
var ContactRouter = (function () {
    function ContactRouter() {
        var _this = this;
        this.getAllContact = function (req, res) {
            var option = new Contact_model_1.Contact();
            option = req.query;
            _this.contactRepo.getList(option)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
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
            console.log(option);
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
        this.SearchByTag = function (req, res) {
            var Contact_TagName = req.query.Contact_TagName;
            _this.contactRepo.SearchByTag(Contact_TagName)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.router = express_1.Router();
        this.contactRepo = new Contact_repo_1.ContactRepo();
    }
    ContactRouter.prototype.getRouter = function () {
        this.router.route('/Contactnotifi')
            .get(this.getAllContact);
        // .post(this.createAContact)
        // .delete(this.deleteAContact);
        this.router.route('/Contact')
            .get(this.getAllContact);
        this.router.route('/Contact/GetOne')
            .get(this.getOne);
        this.router.route('/Contact/Create')
            .post(this.create);
        this.router.route('/Contact/Update')
            .post(this.update);
        this.router.route('/Contact/SearchByTag')
            .get(this.SearchByTag);
        return this.router;
    };
    return ContactRouter;
}());
exports.ContactRouter = ContactRouter;
