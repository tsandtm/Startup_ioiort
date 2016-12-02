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
// su dung cai nay de chay cac test va output ra cac loi
var alsatian_2 = require('alsatian');
// su dung cai nay de test api cua express
var supertest = require('supertest');
// su dung cai nay de ket hop voi asnyc test cua alsatian
var bluebird = require('bluebird');
// lay cai app chinh
var app_2 = require('../../api/app');
var path = require('path');
var testdata = require(path.join(__dirname, 'setting.test.json'));
var config = require(path.join(__dirname, '..', '..', 'config', 'server.config.json'))['test'];
var SettingTest = (function () {
    function SettingTest() {
        // no se tao ra mot client gia va se noi chuyen voi url la http://localhost:8081/api 
        this.request = supertest('http://' + config.host + ':' + config.port + '/api');
    }
    // ham nay se chay dau tien truoc khi cac test chay
    SettingTest.prototype.setUp = function () {
        // khoi tao cai Server
        this.instance = app_2.default.listen(config.port, config.host);
        // console.log('chay setup')
    };
    // cai ham nay se chay cuoi cung sau khi cac test chay
    SettingTest.prototype.tearDown = function () {
        // dong server lai
        this.instance.close();
        // console.log('chay Teardown')
    };
    // dung se test nhung thu ko tra ve lien
    // va them cai dong de mo ta cai test
    // timeout la thoi gian ma cai test nay se cho
    SettingTest.prototype.getAllSetting = function () {
        var _this = this;
        return new bluebird(function (resolve, reject) {
            _this.request.get('/setting')
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
    // @AsyncTest('should return book with name book1')
    // @Timeout(5000)
    // public getABook() {
    //     return new bluebird((resolve, reject) => {
    //         this.request.get('/book')
    //             .query({ id: 1 })
    //             .expect('Content-Type', /json/)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.body).toEqual(bookData[0]);
    //             })
    //             .end(err => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve();
    //                 }
    //             })
    //     })
    // }
    SettingTest.prototype.createASetting = function () {
        var _this = this;
        return new bluebird(function (resolve, reject) {
            _this.request.post('/setting')
                .type('form')
                .send({ AppID: 2, APIKey: 'asdfasdfa3213', AppName: 'Shop', IsActive: 'true', NgayTao: '24/11/2016' })
                .expect(200)
                .expect(function (res) {
                //Expect(res.body).toEqual({ id: 4, name: 'tao tu test' })
            })
                .end(function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    SettingTest.prototype.editASetting = function () {
        var _this = this;
        return new bluebird(function (resolve, reject) {
            _this.request.post('/settingedit')
                .type('form')
                .send({ AppID: 2, APIKey: 'asdfasdfa3213', AppName: 'Shop test edit', IsActive: 'true', NgayTao: '24/11/2016' })
                .expect(200)
                .expect(function (res) {
                //Expect(res.body).toEqual({ id: 4, name: 'tao tu test' })
            })
                .end(function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    SettingTest.prototype.DeleteABook = function () {
        var _this = this;
        return new bluebird(function (resolve, reject) {
            _this.request.post('/settingdelete')
                .type('form')
                .send({ AppID: 2 })
                .expect(200)
                .expect(function (res) {
                //Expect(res.body).toEqual({ id: 4, name: 'tao tu test' })
            })
                .end(function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    __decorate([
        alsatian_2.Setup, 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], SettingTest.prototype, "setUp", null);
    __decorate([
        alsatian_2.Teardown, 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], SettingTest.prototype, "tearDown", null);
    __decorate([
        alsatian_2.AsyncTest('mot danh sach cac device'),
        alsatian_2.Timeout(5000), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], SettingTest.prototype, "getAllSetting", null);
    __decorate([
        alsatian_2.AsyncTest('shuold create and return book'),
        alsatian_2.Timeout(5000), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], SettingTest.prototype, "createASetting", null);
    __decorate([
        alsatian_2.AsyncTest('shuold create and return book'),
        alsatian_2.Timeout(5000), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], SettingTest.prototype, "editASetting", null);
    __decorate([
        alsatian_2.AsyncTest('shuold delete and return book'),
        alsatian_2.Timeout(5000), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], SettingTest.prototype, "DeleteABook", null);
    return SettingTest;
}());
exports.SettingTest = SettingTest;
