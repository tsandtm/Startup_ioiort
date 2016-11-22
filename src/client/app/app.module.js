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
var platform_browser_1 = require('@angular/platform-browser');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var ng2_charts_1 = require('ng2-charts/ng2-charts');
var ng2_pagination_1 = require('ng2-pagination');
var app_routing_module_1 = require('./app.routing.module');
var app_component_1 = require('./app.component');
var book_list_component_1 = require('./books/book-list/book-list.component');
var book_detail_component_1 = require('./books/book-detail/book-detail.component');
var product_list_component_1 = require('./products/product-list/product-list.component');
var product_service_1 = require('./products/shared/product.service');
var notifi_service_1 = require('./notification-send/shared/notifi.service');
var tag_service_1 = require('./notification-send/shared/tag.service');
var contact_service_1 = require('./notification-send/shared/contact.service');
var welcome_component_1 = require('./home/welcome.component');
var product_detail_component_1 = require('./products/product-detail/product-detail.component');
var Report_component_1 = require('./Reports/Report/Report.component');
var product_filter_pipe_1 = require('./products/product-filter/product-filter.pipe');
var star_component_1 = require('./shared/star.component');
var menu_list_component_1 = require('./menu/menu-list/menu-list.component');
var contacts_list_component_1 = require('./contacts/contacts-list/contacts-list.component');
var contacts_service_1 = require('./contacts/shared/contacts.service');
var notifications_list_component_1 = require('./notifications/notifications-list/notifications-list.component');
var notifications_detail_component_1 = require('./notifications/notifications-detail/notifications-detail.component');
var notifications_service_1 = require('./notifications/shared/notifications.service');
var yeucauban_list_component_1 = require('./yeucauban/yeucauban-list/yeucauban-list.component');
var yeucauban_service_1 = require('./yeucauban/shared/yeucauban.service');
var notification_component_1 = require('./notification-send/notification.component');
var confirm_component_1 = require('./notification-send/confirm.component');
//import {RlTagInputModule} from 'angular2-tag-input';
var ng2_tag_input_1 = require('ng2-tag-input');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_module_1.routing, forms_1.FormsModule, http_1.HttpModule, ng2_pagination_1.Ng2PaginationModule, ng2_charts_1.ChartsModule, ng2_tag_input_1.TagInputModule],
            providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }, product_service_1.ProductService, contacts_service_1.ContactsService, notifications_service_1.NotificationsService, yeucauban_service_1.YeucaubanService, contact_service_1.ContactService, notifi_service_1.NotifiService, tag_service_1.TagService],
            declarations: [app_component_1.AppComponent,
                notification_component_1.NotifiSendComponent,
                book_list_component_1.BookListComponent,
                book_detail_component_1.BookDetailComponent,
                welcome_component_1.WelcomeComponent,
                product_detail_component_1.ProductDetailComponent,
                product_list_component_1.ProductListComponent,
                product_filter_pipe_1.ProductFilterPipe,
                Report_component_1.BarChartDemoComponent,
                menu_list_component_1.MenuListComponent,
                contacts_list_component_1.ContactsListComponent,
                notifications_list_component_1.NotificationsListComponent,
                notifications_detail_component_1.NotificationstDetailComponent,
                yeucauban_list_component_1.YeucaubanListComponent,
                star_component_1.StarComponent,
                confirm_component_1.ConfirmComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
