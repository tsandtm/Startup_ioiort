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
var Report_service_1 = require('../Shared/Report.service');
// webpack html imports
var BarChartDemoComponent = (function () {
    function BarChartDemoComponent(reportService) {
        this.reportService = reportService;
        this.datasets = [];
        this.b = [];
        this.c = [];
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        // public barChartLabels:string[] = this.getdevicelabel();
        this.barChartLabels = [];
        //  ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [
            // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
            // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
            { data: [], label: '' }
        ];
        // Doughnut
        this.doughnutChartLabels = [];
        //  ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
        this.doughnutChartData = [];
        this.doughnutChartType = 'doughnut';
    }
    // loadGetAll() {
    //     // this.reportService.getDevice().then( (result) => this.Reports = result);
    // }
    BarChartDemoComponent.prototype.loadGetAll = function () {
        var _this = this;
        this.reportService.getDevice().then(function (result) {
            _this.listDevice = result;
            _this.barChartLabels = _this.getmonthlabel();
            _this.createDataSets();
            _this.barChartData = _this.datasets;
            _this.createLabelsDoughnut();
            console.log(_this.b + "abc" + _this.c);
            _this.doughnutChartData = _this.c;
            _this.doughnutChartLabels = _this.b;
        });
    };
    BarChartDemoComponent.prototype.createDataSets = function () {
        var _this = this;
        this.listDevice.forEach(function (ld) {
            ld.listdevice.forEach(function (d) {
                var index = _this.checkIfLabelExists(d.name);
                if (index === -1) {
                    _this.datasets.push({ data: [d.count], label: d.name });
                }
                else {
                    _this.datasets[index].data.push(d.count);
                }
            });
        });
    };
    BarChartDemoComponent.prototype.createLabelsDoughnut = function () {
        var _this = this;
        this.listDevice.forEach(function (ld) {
            ld.listdevice.forEach(function (d) {
                var index = _this.checkIfLabelExists(d.name);
                if (index === -1) {
                    //   this.datasets.push({ data: [d.count], label: d.name });
                    // } else {
                    //   this.datasets[index].data.push(d.count);
                    _this.b.push(d.name);
                    _this.c.push(d.count);
                }
            });
        });
    };
    BarChartDemoComponent.prototype.checkIfLabelExists = function (label) {
        if (this.datasets.length === 0)
            return -1;
        return this.datasets.findIndex(function (d) { return d.label === label; });
    };
    BarChartDemoComponent.prototype.getmonthlabel = function () {
        var a = [];
        this.listDevice.forEach(function (r) {
            //  console.log(JSON.stringify(r.date));
            a.push(r.date);
        });
        return a;
    };
    BarChartDemoComponent.prototype.getlistname = function () {
        var b = [];
        var c = [];
        this.listDevice.forEach(function (r) {
            b = r.listdevice;
            b.forEach(function (result) {
                c.push(result.name);
            });
        });
        console.log(c);
        return c;
    };
    BarChartDemoComponent.prototype.ngOnInit = function () {
        this.loadGetAll();
    };
    // events
    BarChartDemoComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    BarChartDemoComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    BarChartDemoComponent.prototype.randomize = function () {
        // Only Change 3 values
        var data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40];
        var clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    };
    BarChartDemoComponent = __decorate([
        core_1.Component({
            selector: 'Report',
            templateUrl: '/Reports/Report/Report.component.html',
            styleUrls: ['/assets/shop-homepage.css'],
            providers: [Report_service_1.ReportService],
        }), 
        __metadata('design:paramtypes', [Report_service_1.ReportService])
    ], BarChartDemoComponent);
    return BarChartDemoComponent;
}());
exports.BarChartDemoComponent = BarChartDemoComponent;
