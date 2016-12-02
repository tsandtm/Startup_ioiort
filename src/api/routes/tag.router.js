"use strict";
// đây là vùng import tất cả các modules bên ngoài
var express_1 = require('express');
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
        this.router = express_1.Router();
        this.tagRepo = new Tag_repo_1.TagRepo();
    }
    TagRouter.prototype.getRouter = function () {
        this.router.route('/Tag')
            .get(this.getAllTag);
        return this.router;
    };
    return TagRouter;
}());
exports.TagRouter = TagRouter;
