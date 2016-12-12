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
var TagService = (function () {
    function TagService(_http) {
        this._http = _http;
    }
    TagService.prototype.getTags = function () {
        // return this._http.get('/api/book')
        //     .map((response: Response) => <Product[]>response.json())
        //     .do(data => console.log('All: ' + JSON.stringify(data)))
        //     .catch(this.handleError);
        return this._http.get('/api/Tag')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TagService.prototype.CreateTag = function (valueTagNameDisplay, valueAccountID, valueIsDefault) {
        var params = JSON.stringify({ TagNameDisplay: valueTagNameDisplay, AccountID: valueAccountID, IsDefault: valueIsDefault });
        var headers = new http_1.Headers();
        console.log('params: ' + params);
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/Tag/CreateTag', params, {
            headers: headers,
            body: params
        })
            .toPromise()
            .then(function (response) {
            return response;
        })
            .catch(this.handleError);
    };
    TagService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error);
        // return Observable.throw(error.json().error || 'Server error');
    };
    TagService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TagService);
    return TagService;
}());
exports.TagService = TagService;
