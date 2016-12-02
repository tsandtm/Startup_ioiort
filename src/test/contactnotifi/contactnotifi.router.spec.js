"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var alsatian_2 = require('alsatian');
var supertest = require('supertest');
var bluebird = require('bluebird');
//import { bookData,productData } from './test.data';
var app_2 = require('../../api/app');
var path = require('path');
var testdata = require(path.join(__dirname, 'contactnotifi.test.json'));
var config = require(path.join(__dirname, '..', '..', 'config', 'server.config.json'))['test'];
var ContactNotifiRouter = (function () {
    function ContactNotifiRouter() {
        this.request = supertest('http://' + config.host + ':' + config.port + '/api');
    }
    ContactNotifiRouter.prototype.setUp = function () {
        this.instance = app_2.default.listen(config.port, config.host);
        // console.log('chay setup')
    };
    ContactNotifiRouter.prototype.tearDown = function () {
        this.instance.close();
        // console.log('chay Teardown')
    };
    ContactNotifiRouter.prototype.getAllBook = function () {
        var _this = this;
        return new bluebird(function (resolve, reject) {
            _this.request.get('/Contactnotifi')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                alsatian_2.Expect(res.body).toEqual(testdata);
            })
                .end(function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    //     // @AsyncTest('should return book with name book1')
    //     // @Timeout(5000)
    //     // public getABook() {
    //     //     return new bluebird((resolve, reject) => {
    //     //         this.request.get('/book')
    //     //             .query({ id: 1 })
    //     //             .expect('Content-Type', /json/)
    //     //             .expect((res: supertest.Response) => {
    //     //                 Expect(res.body).toEqual(bookData[0]);
    //     //             })
    //     //             .end(err => {
    //     //                 if (err) {
    //     //                     reject(err);
    //     //                 } else {
    //     //                     resolve();
    //     //                 }
    //     //             })
    //     //     })
    //     // }
    //     // @AsyncTest('shuold create and return book')
    //     // @Timeout(5000)
    //     // public createABook() {
    //     //     return new bluebird((resolve, reject) => {
    //     //         this.request.post('/book')
    //     //             .type('form')
    //     //             .send({ name: 'tao tu test' })
    //     //             .expect(200)
    //     //             .expect((res: supertest.Response) => {
    //     //                 Expect(res.body).toEqual({ id: 4, name: 'tao tu test' })
    //     //             })
    //     //             .end(err => {
    //     //                 if (err) {
    //     //                     reject(err)
    //     //                 } else {
    //     //                     resolve()
    //     //                 }
    //     //             })
    //     //     })
    //     // }
    //     // @AsyncTest('should delete and return book name')
    //     // @Timeout(5000)
    //     // @TestCase(1)
    //     // public deleteABook(index: number) {
    //     //     return new bluebird((resolve, reject) => {
    //     //         this.request.delete('/book')
    //     //             .query({ id: bookData[index].id })
    //     //             .expect(200)
    //     //             .expect((res: supertest.Response) => {
    //     //                 Expect(res.text).toEqual('sach ' + bookData[index].name + ' da duoc huy')
    //     //             })
    //     //             .end(err => {
    //     //                 if (err) {
    //     //                     reject(err)
    //     //                 } else {
    //     //                     resolve()
    //     //                 }
    //     //             })
    //     //     })
    //     // }
    ContactNotifiRouter.prototype.testAdd = function (v1, v2, expected) {
        alsatian_2.Expect(v1 + v2).toEqual(expected);
    };
    __decorate([
        alsatian_2.Setup, 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], ContactNotifiRouter.prototype, "setUp", null);
    __decorate([
        alsatian_2.Teardown, 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], ContactNotifiRouter.prototype, "tearDown", null);
    __decorate([
        alsatian_2.AsyncTest('should return json array'),
        alsatian_2.Timeout(5000), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], ContactNotifiRouter.prototype, "getAllBook", null);
    __decorate([
        alsatian_2.Test('add 1 and 2 shuold return 3'),
        alsatian_2.TestCase(1, 2, 3), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object, Object]), 
        __metadata('design:returntype', void 0)
    ], ContactNotifiRouter.prototype, "testAdd", null);
    return ContactNotifiRouter;
}());
exports.ContactNotifiRouter = ContactNotifiRouter;
