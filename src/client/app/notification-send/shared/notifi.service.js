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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var NotifiService = (function () {
    function NotifiService(_http) {
        this._http = _http;
        this._productUrl = 'api/products/products.json';
    }
    NotifiService.prototype.Create = function (req) {
        return this._http.post('/api/notifi', req)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    NotifiService.prototype.Update = function (req) {
        return this._http.post('/api/notifigetone', req)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    NotifiService.prototype.Insert = function (req) {
        return this._http.post('/api/sentuser', req)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    NotifiService.prototype.getslsend = function (req) {
        return this._http.post('/api/sl', req)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    NotifiService.prototype.getsldenied = function (req) {
        return this._http.post('/api/sldenied', req)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    NotifiService.prototype.getLastNotifi = function () {
        return this._http.get('/api/notifi')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    NotifiService.prototype.getAllNoti = function () {
        return this._http.get('/api/notifigetone')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    NotifiService.prototype.getOne = function (id) {
        return this.getAllNoti()
            .then(function (products) { return products.find(function (p) { return p.NotifiID === id; }); })
            .catch(this.handleError);
    };
    NotifiService.prototype.getAllSL = function () {
        return this._http.get('/api/sl')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    NotifiService.prototype.getSL = function (id) {
        return this.getAllSL()
            .then(function (slsend) { return slsend.find(function (p) { return p.NotifiID === id; }); })
            .catch(this.handleError);
    };
    NotifiService.prototype.getAllSLDenied = function () {
        return this._http.get('/api/sldenied')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    NotifiService.prototype.getSLDenied = function (id) {
        return this.getAllSLDenied()
            .then(function (slsend) { return slsend.find(function (p) { return p.NotifiID === id; }); })
            .catch(this.handleError);
    };
    NotifiService.prototype.getSend = function () {
        return this._http.get('/api/sentuser')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    NotifiService.prototype.getSendUser = function (id) {
        return this.getSend()
            .then(function (slsend) { return slsend.filter(function (p) { return p.NotifiID === id; }); })
            .catch(this.handleError);
    };
    NotifiService.prototype.getSendDenied = function () {
        return this._http.get('/api/sentuserdenied')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    NotifiService.prototype.getSendUserDenied = function (id) {
        return this.getSendDenied()
            .then(function (slsend) { return slsend.filter(function (p) { return p.NotifiID === id; }); })
            .catch(this.handleError);
    };
    NotifiService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error);
        // return Observable.throw(error.json().error || 'Server error');
    };
    NotifiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], NotifiService);
    return NotifiService;
}());
exports.NotifiService = NotifiService;
