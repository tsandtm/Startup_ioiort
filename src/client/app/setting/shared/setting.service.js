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
var SettingService = (function () {
    function SettingService(_http) {
        this._http = _http;
    }
    SettingService.prototype.getAllSetting = function () {
        // return this._http.get('/api/book')
        //     .map((response: Response) => <Product[]>response.json())
        //     .do(data => console.log('All: ' + JSON.stringify(data)))
        //     .catch(this.handleError);
        return this._http.get('/api/setting')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SettingService.prototype.Create = function (req) {
        return this._http.post('/api/setting', req)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SettingService.prototype.Edit = function (req) {
        return this._http.post('/api/settingedit', req)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SettingService.prototype.Delete = function (req) {
        return this._http.post('/api/settingdelete', req)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SettingService.prototype.getOne = function (id) {
        return this.getAllSetting()
            .then(function (setting) { return setting.find(function (p) { return p.AppID === id; }); })
            .catch(this.handleError);
    };
<<<<<<< HEAD
    SettingService.prototype.getCount = function () {
        return this._http.get('/api/settingcount')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SettingService.prototype.getAppName = function (req) {
        return this._http.get('/api/settingAppName?so=' + req)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SettingService.prototype.getAPI = function (req) {
        return this._http.get('/api/settingAPI?so=' + req)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SettingService.prototype.getAppID = function () {
        return this._http.get('/api/settingAppID')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SettingService.prototype.getPager = function (totalItems, currentPage, pageSize) {
        if (pageSize === void 0) { pageSize = 15; }
=======
    SettingService.prototype.getPager = function (totalItems, currentPage, pageSize) {
        if (currentPage === void 0) { currentPage = 1; }
        if (pageSize === void 0) { pageSize = 10; }
>>>>>>> c673b48189d43e88582aceadb665102779e03bdd
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        }
        else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            }
            else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            }
            else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        // create an array of pages to ng-repeat in the pager control
        var pages;
<<<<<<< HEAD
        if (currentPage <= 3) {
            if (totalPages < 5) {
                for (var n = 1; n <= totalPages; n++) {
                    if (pages == undefined)
                        pages = [n];
                    else
                        pages.push(n);
                }
                ;
            }
            else {
                for (var n = 1; n <= 5; n++) {
                    if (pages == undefined)
                        pages = [n];
                    else
                        pages.push(n);
                }
                ;
            }
        }
        else if (currentPage >= (totalPages - 2)) {
            for (var n = (totalPages - 4); n <= totalPages; n++) {
                if (pages == undefined)
                    pages = [n];
                else
                    pages.push(n);
            }
            ;
        }
        else {
            for (var n = currentPage - 2; n < (currentPage + 3); n++) {
                if (pages == undefined)
                    pages = [n];
                else
                    pages.push(n);
            }
            ;
=======
        for (var n = 1; n < (totalPages + 1); n++) {
            if (pages == undefined)
                pages = [1];
            else
                pages.push(n);
            console.log(totalPages + n);
>>>>>>> c673b48189d43e88582aceadb665102779e03bdd
        }
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    };
    SettingService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error);
        // return Observable.throw(error.json().error || 'Server error');
    };
    SettingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SettingService);
    return SettingService;
}());
exports.SettingService = SettingService;
