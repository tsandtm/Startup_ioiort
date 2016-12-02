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
var DateFilterPipe = (function () {
    function DateFilterPipe() {
    }
    DateFilterPipe.prototype.transform = function (value, dateValue) {
        var _this = this;
        var strValue = dateValue ? dateValue.toLocaleString() : null;
        return strValue ? value.filter(function (set) {
            if (set.ThoiGianGui) {
                var d1 = new Date(set.ThoiGianGui);
                var d2 = new Date(dateValue);
                var sd1 = _this.dateToString(d1);
                var sd2 = _this.dateToString(d2);
                console.log(sd1 + ' ' + sd2);
                console.log(sd1 === sd2);
                // console.log(d2);
                return sd1 === sd2;
            }
            return false;
        }) : value;
    };
    DateFilterPipe.prototype.dateToString = function (d) {
        var day = d.getDate().toString();
        var month = (d.getMonth() + 1).toString();
        var year = d.getFullYear().toString();
        return day + '-' + month + '-' + year;
    };
    DateFilterPipe = __decorate([
        core_1.Pipe({
            name: 'dateFilter'
        }), 
        __metadata('design:paramtypes', [])
    ], DateFilterPipe);
    return DateFilterPipe;
}());
exports.DateFilterPipe = DateFilterPipe;
