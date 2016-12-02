"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var repositories_base_1 = require('./repositories.base');
var book_model_1 = require('../models/book.model');
var BookRepo = (function (_super) {
    __extends(BookRepo, _super);
    function BookRepo() {
        _super.call(this);
    }
    BookRepo.prototype.getList = function (option) {
        var queryText = 'select * from test.books';
        console.info('Excute: ' + queryText);
        var pResult;
        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.name]);
            console.log(option.id);
        }
        else {
            pResult = this._pgPool.query(queryText);
        }
        return pResult.then(function (result) {
            var books = result.rows.map(function (r) {
                var book = new book_model_1.Book();
                book.id = r.id;
                book.name = r.name;
                return book;
            });
            return books;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    BookRepo.prototype.getOne = function (option) {
        var queryText = 'select * from test.books where id=$1 and name=$2';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.id, option.name])
            .then(function (result) {
            var book = new book_model_1.Book();
            book.id = result.rows[0].id;
            book.name = result.rows[0].name;
            return book;
        });
    };
    BookRepo.prototype.count = function (option) {
        var queryText = 'select count(*) as abc from test.books';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText)
            .then(function (result) {
            return result.rows[0].abc;
        });
    };
    return BookRepo;
}(repositories_base_1.RepoBase));
exports.BookRepo = BookRepo;
