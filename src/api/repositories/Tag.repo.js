"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var repositories_base_1 = require('./repositories.base');
var Tag_model_1 = require('../models/Tag.model');
var TagRepo = (function (_super) {
    __extends(TagRepo, _super);
    function TagRepo() {
        _super.call(this);
    }
    TagRepo.prototype.getList = function () {
        var queryText = 'select * from test."n_Tag"';
        var pResult;
        pResult = this._pgPool.query(queryText);
        return pResult.then(function (result) {
            var Tags = result.rows.map(function (r) {
                var tag = new Tag_model_1.Tag();
                tag.TagID = r.TagID;
                tag.TagNameDisplay = r.TagNameDisplay;
                tag.AccountID = r.AccountID;
                tag.IsDefault = r.IsDefault;
                return tag;
            });
            return Tags;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    return TagRepo;
}(repositories_base_1.RepoBase));
exports.TagRepo = TagRepo;
