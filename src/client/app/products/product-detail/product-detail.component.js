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
var router_1 = require('@angular/router');
var product_model_1 = require('../shared/product.model');
var product_service_1 = require('../shared/product.service');
var ProductDetailComponent = (function () {
    function ProductDetailComponent(_productService, _router, _route) {
        this._productService = _productService;
        this._router = _router;
        this._route = _route;
        this.pageTitle = 'Product Detail';
    }
    ProductDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            console.log(params["id"]);
            var id = +params["id"];
            _this.getProduct(id);
        });
    };
    ProductDetailComponent.prototype.getProduct = function (id) {
        // this._productService.getProduct(id)
        //     .subscribe(
        //     product => this.product = product,
        //     error => this.errorMessage = <any>error);
        var _this = this;
        this._productService.getProduct(id)
            .then(function (product) { return _this.product = product; });
    };
    ProductDetailComponent.prototype.onBack = function () {
        this._router.navigate(['products']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', product_model_1.Product)
    ], ProductDetailComponent.prototype, "product", void 0);
    ProductDetailComponent = __decorate([
        core_1.Component({
            templateUrl: '/products/product-detail/product-detail.component.html'
        }), 
        __metadata('design:paramtypes', [product_service_1.ProductService, router_1.Router, router_1.ActivatedRoute])
    ], ProductDetailComponent);
    return ProductDetailComponent;
}());
exports.ProductDetailComponent = ProductDetailComponent;
