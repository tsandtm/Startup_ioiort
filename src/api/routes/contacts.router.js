"use strict";
var express_1 = require('express');
var contacts_repo_1 = require('../repositories/contacts.repo');
//let mockProduct = require(path.join(__dirname,'..','json','products.json'));
var ContactsRouter = (function () {
    function ContactsRouter() {
        var _this = this;
        this.getAllContacts = function (req, res) {
            //  let object={ id: 1, ToKen: 'contact' };
            _this.contactsRepo.getList(null)
                .then(function (result) {
                res.status(200).json(result);
            })
                .catch(function (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            });
        };
        this.router = express_1.Router();
        this.contactsRepo = new contacts_repo_1.ContactsRepo();
    }
    ContactsRouter.prototype.getRouter = function () {
        this.router.route('/contact')
            .get(this.getAllContacts);
        return this.router;
    };
    return ContactsRouter;
}());
exports.ContactsRouter = ContactsRouter;
