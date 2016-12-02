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
var testdata = require(path.join(__dirname, 'notifi.test.json'));
var config = require(path.join(__dirname, '..', '..', 'config', 'server.config.json'))['test'];
var NotifiRouter = (function () {
    function NotifiRouter() {
        this.request = supertest('http://' + config.host + ':' + config.port + '/api');
    }
    NotifiRouter.prototype.setUp = function () {
        this.instance = app_2.default.listen(config.port, config.host);
        // console.log('chay setup')
    };
    NotifiRouter.prototype.tearDown = function () {
        this.instance.close();
        // console.log('chay Teardown')
    };
    NotifiRouter.prototype.getLastNotifi = function () {
        var _this = this;
        return new bluebird(function (resolve, reject) {
            _this.request.get('/notifi')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                alsatian_2.Expect(res.body).toEqual(testdata[0]);
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
    NotifiRouter.prototype.getAllnotifi = function () {
        var _this = this;
        return new bluebird(function (resolve, reject) {
            _this.request.get('/notifigetone')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                alsatian_2.Expect(res.body).toEqual(testdata[1]);
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
    NotifiRouter.prototype.getSL = function () {
        var _this = this;
        return new bluebird(function (resolve, reject) {
            _this.request.get('/sl')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                alsatian_2.Expect(res.body).toEqual(testdata[2]);
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
    NotifiRouter.prototype.getSLdenied = function () {
        var _this = this;
        return new bluebird(function (resolve, reject) {
            _this.request.get('/sldenied')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                alsatian_2.Expect(res.body).toEqual(testdata[3]);
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
    NotifiRouter.prototype.getSentUser = function () {
        var _this = this;
        return new bluebird(function (resolve, reject) {
            _this.request.get('/sentuser')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                alsatian_2.Expect(res.body).toEqual(testdata[4]);
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
    NotifiRouter.prototype.getSentUserDenied = function () {
        var _this = this;
        return new bluebird(function (resolve, reject) {
            _this.request.get('/sentuserdenied')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                alsatian_2.Expect(res.body).toEqual(testdata[5]);
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
    NotifiRouter.prototype.createNotifi = function () {
        var _this = this;
        return new bluebird(function (resolve, reject) {
            _this.request.post('/notifi')
                .type('form')
                .send({
                NotifiID: 2,
                AppID: 1,
                TieuDe: 'test',
                NoiDung: 'test'
            })
                .expect(200)
                .expect(function (res) {
                alsatian_2.Expect(res.body).toEqual(null);
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
    NotifiRouter.prototype.updateNotifi = function () {
        var _this = this;
        return new bluebird(function (resolve, reject) {
            _this.request.post('/notifigetone')
                .type('form')
                .send({
                NotifiID: 1,
                Trangthai: 1
            })
                .expect(200)
                .expect(function (res) {
                alsatian_2.Expect(res.body).toEqual(null);
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
    NotifiRouter.prototype.getSlSend = function () {
        var _this = this;
        return new bluebird(function (resolve, reject) {
            _this.request.post('/sl')
                .type('form')
                .send({
                contact: [2, 4],
                tag: [1, 3],
                contactdenied: [1],
                tagdenied: [2]
            })
                .expect(200)
                .expect(function (res) {
                alsatian_2.Expect(res.body).toEqual(3);
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
    NotifiRouter.prototype.getSlSendDenied = function () {
        var _this = this;
        return new bluebird(function (resolve, reject) {
            _this.request.post('/sldenied')
                .type('form')
                .send({
                contactdenied: [2],
                tagdenied: [1, 3]
            })
                .expect(200)
                .expect(function (res) {
                alsatian_2.Expect(res.body).toEqual(1);
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
    NotifiRouter.prototype.Insert = function () {
        var _this = this;
        return new bluebird(function (resolve, reject) {
            _this.request.post('/sentuser')
                .type('form')
                .send({
                ContactID: 2,
                NotifiID: 2
            })
                .expect(200)
                .expect(function (res) {
                alsatian_2.Expect(res.body).toEqual(null);
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
    NotifiRouter.prototype.testAdd = function (v1, v2, expected) {
        alsatian_2.Expect(v1 + v2).toEqual(expected);
    };
    __decorate([
        alsatian_2.Setup, 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NotifiRouter.prototype, "setUp", null);
    __decorate([
        alsatian_2.Teardown, 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NotifiRouter.prototype, "tearDown", null);
    __decorate([
        alsatian_2.AsyncTest('should return json array'),
        alsatian_2.Timeout(5000), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NotifiRouter.prototype, "getLastNotifi", null);
    __decorate([
        alsatian_2.AsyncTest('should return json array'),
        alsatian_2.Timeout(5000), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NotifiRouter.prototype, "getAllnotifi", null);
    __decorate([
        alsatian_2.AsyncTest('should return json array'),
        alsatian_2.Timeout(5000), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NotifiRouter.prototype, "getSL", null);
    __decorate([
        alsatian_2.AsyncTest('should return json array'),
        alsatian_2.Timeout(5000), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NotifiRouter.prototype, "getSLdenied", null);
    __decorate([
        alsatian_2.AsyncTest('should return json array'),
        alsatian_2.Timeout(5000), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NotifiRouter.prototype, "getSentUser", null);
    __decorate([
        alsatian_2.AsyncTest('should return json array'),
        alsatian_2.Timeout(5000), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NotifiRouter.prototype, "getSentUserDenied", null);
    __decorate([
        alsatian_2.AsyncTest('should create'),
        alsatian_2.Timeout(5000), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NotifiRouter.prototype, "createNotifi", null);
    __decorate([
        alsatian_2.AsyncTest('should update'),
        alsatian_2.Timeout(5000), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NotifiRouter.prototype, "updateNotifi", null);
    __decorate([
        alsatian_2.AsyncTest('should get slsend'),
        alsatian_2.Timeout(5000), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NotifiRouter.prototype, "getSlSend", null);
    __decorate([
        alsatian_2.AsyncTest('should get slsend denied'),
        alsatian_2.Timeout(5000), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NotifiRouter.prototype, "getSlSendDenied", null);
    __decorate([
        alsatian_2.AsyncTest('should insert'),
        alsatian_2.Timeout(5000), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NotifiRouter.prototype, "Insert", null);
    __decorate([
        alsatian_2.Test('add 1 and 2 shuold return 3'),
        alsatian_2.TestCase(1, 2, 3), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object, Object]), 
        __metadata('design:returntype', void 0)
    ], NotifiRouter.prototype, "testAdd", null);
    return NotifiRouter;
}());
exports.NotifiRouter = NotifiRouter;
