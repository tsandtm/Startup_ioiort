"use strict";
// đây là vùng import tất cả các modules bên ngoài
var express_1 = require('express');
var Tag_model_1 = require('../models/Tag.model');
// import các module tạo table
var Tag_repo_1 = require('../repositories/Tag.repo');
var TagRouter = (function () {
    function TagRouter() {
        var _this = this;
        this.getAllTag = function (req, res) {
            _this.tagRepo.getList()
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.CreateTag = function (req, res) {
            var option = new Tag_model_1.Tag();
            option.TagNameDisplay = req.body.TagNameDisplay;
            option.AccountID = req.body.AccountID;
            option.IsDefault = req.body.IsDefault;
            _this.tagRepo.CreateTag(option)
                .then(function (result) {
                res.status(200).json(result);
            });
        };
        this.router = express_1.Router();
        this.tagRepo = new Tag_repo_1.TagRepo();
    }
    TagRouter.prototype.getRouter = function () {
        this.router.route('/Tag')
            .get(this.getAllTag);
        this.router.route('/Tag/CreateTag')
            .post(this.CreateTag);
        return this.router;
    };
    return TagRouter;
}());
exports.TagRouter = TagRouter;
