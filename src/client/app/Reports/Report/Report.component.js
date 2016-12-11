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
var Report_model_1 = require('../Shared/Report.model');
// webpack html imports
var BarChartDemoComponent = (function () {
    function BarChartDemoComponent(reportService) {
        this.reportService = reportService;
        this.datasets = [];
        this.devices = [];
        this.testto = 0;
        this.a = [];
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
        this.reportService.getAllDeviceforDougnut().then(function (result) {
            _this.Reports = result;
            _this.devices = _this.getlabeldonoughnut();
        });
        this.reportService.getDevice().then(function (result) {
            _this.listDevice = result;
            _this.barChartLabels = _this.getmonthlabel();
            _this.createDataSets();
            _this.barChartData = _this.datasets;
            return 1;
        })
            .then(function (result) {
            _this.loadgetdougnut();
        });
    };
    BarChartDemoComponent.prototype.loadgetdougnut = function () {
        var _this = this;
        this.reportService.getAllDeviceforDougnut().then(function (result) {
            _this.Reports = result;
            _this.createDataSets();
            _this.doughnutChartData = _this.getdatadonoughnut();
            _this.doughnutChartLabels = _this.getlabeldonoughnut();
            _this.gettotal();
            _this.getpercent();
        });
    };
    BarChartDemoComponent.prototype.createDataSets = function () {
        // for (let i = 0; i < this.devices.length; i++) {
        var _this = this;
        this.listDevice.forEach(function (ld) {
            if (ld.listdevice.length < _this.devices.length) {
                ld.listdevice.forEach(function (d) {
                    for (var i = 0; i < _this.devices.length; i++) {
                        if (_this.devices[i] != d.name) {
                            _this.rp = new Report_model_1.Report();
                            _this.rp.name = _this.devices[i];
                            _this.rp.count = 0;
                            ld.listdevice.push(_this.rp);
                        }
                    }
                });
            }
            console.log(JSON.stringify(ld));
            ld.listdevice.forEach(function (d) {
                // if(this.devices[i] != d.name)
                // {
                //   console.log("mang devices: " + this.devices[i]);
                //     d.name=this.devices[i];
                //     d.count=0;
                // }
                var index = _this.checkIfLabelExists(d.name);
                if (index === -1) {
                    _this.datasets.push({ data: [d.count], label: d.name });
                }
                else {
                    _this.datasets[index].data.push(d.count);
                }
            });
        });
        // }
    };
    BarChartDemoComponent.prototype.checkIfLabelExists = function (label) {
        if (this.datasets.length === 0)
            return -1;
        return this.datasets.findIndex(function (d) { return d.label === label; });
    };
    BarChartDemoComponent.prototype.getdatabymonth = function (id) {
        var _this = this;
        var date = new Date();
        var month = date.getMonth();
        var year = date.getFullYear();
        var my = month + ";" + year;
        // console.log(month);
        // console.log(year);
        // console.log(my);
        if (id == 1) {
            month = date.getMonth();
            year = date.getFullYear();
            my = month + ";" + year;
            // console.log(my);
            this.reportService.getDevicebydate(my).then(function (result) {
                _this.listDevice = result;
                _this.barChartLabels = _this.getmonthlabel();
                _this.createDataSets();
                _this.barChartData = _this.datasets;
            }).catch(function (error) {
                console.log("error");
            });
        }
        else if (id == 2) {
            month = date.getMonth() + 1;
            year = date.getFullYear();
            my = month + ";" + year;
            this.reportService.getDevicebydate(my).then(function (result) {
                _this.listDevice = result;
                _this.barChartLabels = _this.getmonthlabel();
                _this.createDataSets();
                _this.barChartData = _this.datasets;
            }).catch(function (error) {
                console.log("error");
            });
        }
        else {
            this.reportService.getDevice().then(function (result) {
                _this.listDevice = result;
                console.log(_this.listDevice);
                _this.barChartLabels = _this.getmonthlabel();
                _this.createDataSets();
                _this.barChartData = _this.datasets;
            });
        }
    };
    BarChartDemoComponent.prototype.getmonthlabel = function () {
        var a = [];
        this.listDevice.forEach(function (r) {
            //  console.log(JSON.stringify(r.date));
            a.push("Tháng " + r.date);
        });
        return a;
    };
    BarChartDemoComponent.prototype.getlabeldonoughnut = function () {
        var a = [];
        this.Reports.forEach(function (r) {
            a.push(r.name);
        });
        return a;
    };
    BarChartDemoComponent.prototype.getdatadonoughnut = function () {
        var a = [];
        this.Reports.forEach(function (r) {
            a.push(r.count);
        });
        return a;
    };
    BarChartDemoComponent.prototype.loadAllDeviceforDougnut = function () {
        var _this = this;
        return this.reportService.getAllDeviceforDougnut()
            .then(function (response) {
            _this.ArrayReport = response;
            return _this.ArrayReport;
        })
            .catch(function (error) {
            console.log(error);
            return error;
        });
    };
    BarChartDemoComponent.prototype.gettotal = function () {
        var _this = this;
        this.loadAllDeviceforDougnut()
            .then(function () {
            for (var i = 0; i < _this.ArrayReport.length; i++) {
                _this.testto += parseInt(_this.ArrayReport[i].count.toString());
            }
        });
    };
    BarChartDemoComponent.prototype.getpercent = function () {
        var _this = this;
        var index;
        var flag = "";
        this.loadAllDeviceforDougnut()
            .then(function () {
            for (var i = 0; i < _this.ArrayReport.length; i++) {
                if (flag != _this.ArrayReport[i].name) {
                    _this.c[i] = Math.floor((parseInt(_this.ArrayReport[i].count.toString()) / _this.testto) * 100) + "%   " + "thiết bị " + _this.ArrayReport[i].name;
                }
            }
        });
    };
    BarChartDemoComponent.prototype.ngOnInit = function () {
        this.loadGetAll();
        // this.loadgetdougnut();
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
