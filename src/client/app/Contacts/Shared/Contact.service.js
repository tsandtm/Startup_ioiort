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
var ContactService = (function () {
    function ContactService(_http) {
        this._http = _http;
        this._productUrl = 'api/products/products.json';
    }
    ContactService.prototype.getContacts = function (PageNum) {
        return this._http.get('/api/Contact?PageNum=' + PageNum)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ContactService.prototype.getOneContact = function (ContactID) {
        return this._http.get('/api/Contact/GetOne?ContactID=' + ContactID)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    // getContact(ContactID: number): Promise<Contact> {
    //     return this.getContacts(0, )
    //         .then(response => response.find(x => x.ContactID == ContactID))
    //         .catch(this.handleError);
    // }
    ContactService.prototype.updateContact = function (valueID, valueTagID, valueTagName) {
        var params = JSON.stringify({ ContactID: valueID, Contact_TagID: valueTagID, Contact_TagName: valueTagName });
        var headers = new http_1.Headers();
        console.log('params: ' + params);
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/Contact/Update', params, {
            headers: headers,
            body: params
        })
            .toPromise()
            .then(function (response) {
            return response;
        })
            .catch(this.handleError);
    };
    ContactService.prototype.SearchByTag = function (Contact_TagName, PageNum) {
        return this._http.get('/api/Contact/SearchByTag?Contact_TagName=' + Contact_TagName + '&PageNum=' + PageNum)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ContactService.prototype.GetPager = function (totalItems, currentPage, pageSize) {
        if (pageSize === void 0) { pageSize = 25; }
        // default to first page
        currentPage = currentPage || 1;
        // default page size is 10
        pageSize = pageSize || 10;
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
        for (var n = startPage; n < (endPage + 1); n++) {
            if (pages == undefined)
                pages = [1];
            else
                pages.push(n);
        }
        ;
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
    // getPager(totalItems: number, currentPage: number = 1, pageSize: number = 25) {
    //     // calculate total pages
    //     var totalPages = Math.ceil(totalItems / pageSize);
    //     var startPage, endPage;
    //     if (totalPages <= 25) {
    //         // less than 10 total pages so show all
    //         startPage = 1;
    //         endPage = totalPages;
    //     } else {
    //         // more than 10 total pages so calculate start and end pages
    //         if (currentPage <= 6) {
    //             startPage = 1;
    //             endPage = 10;
    //         } else if (currentPage + 4 >= totalPages) {
    //             startPage = totalPages - 9;
    //             endPage = totalPages;
    //         } else {
    //             startPage = currentPage - 5;
    //             endPage = currentPage + 4;
    //         }
    //     }
    //     // calculate start and end item indexes
    //     var startIndex = (currentPage - 1) * pageSize;
    //     var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    //     // create an array of pages to ng-repeat in the pager control
    //     var pages: number[];
    //     for (var n: number = 1; n < (totalPages + 1); n++) {
    //         if (pages == undefined)
    //             pages = [1];
    //         else
    //             pages.push(n);
    //         console.log(totalPages + n);
    //     };
    //     // return object with all pager properties required by the view
    //     return {
    //         totalItems: totalItems,
    //         currentPage: currentPage,
    //         pageSize: pageSize,
    //         totalPages: totalPages,
    //         startPage: startPage,
    //         endPage: endPage,
    //         startIndex: startIndex,
    //         endIndex: endIndex,
    //         pages: pages
    //     };
    // }
    ContactService.prototype.handleError = function (error) {
        console.error(error);
        return Promise.reject(error.message || error);
    };
    ContactService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ContactService);
    return ContactService;
}());
exports.ContactService = ContactService;
