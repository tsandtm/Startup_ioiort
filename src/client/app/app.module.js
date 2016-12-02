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
var angular2_modal_1 = require('angular2-modal');
var bootstrap_1 = require('angular2-modal/plugins/bootstrap');
var app_routing_module_1 = require('./app.routing.module');
var app_component_1 = require('./app.component');
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
var Contact_list_component_1 = require('./Contacts/Contact-list/Contact-list.component');
var Contact_filter_pipe_1 = require('./Contacts/Contact-filter/Contact-filter.pipe');
var Contact_detail_component_1 = require('./Contacts/Contact-detail/Contact-detail.component');
// Trùng tên contactService  với thánh Võ
var Contact_service_1 = require('./Contacts/shared/Contact.service');
var Contact_update_component_1 = require('./Contacts/Contact-update/Contact-update.component');
var notifications_filter_pipe_1 = require('./notifications/notifications-filter/notifications-filter.pipe');
var notifications_detailedit_component_1 = require('./notifications/notifications-detailedit/notifications-detailedit.component');
var setting_list_component_1 = require('./setting/setting-list/setting-list.component');
var setting_service_1 = require('./setting/shared/setting.service');
var setting_create_component_1 = require('./setting/setting-create/setting-create.component');
var setting_edit_component_1 = require('./setting/setting-edit/setting-edit.component');
var setting_delete_component_1 = require('./setting/setting-delete/setting-delete.component');
var setting_detail_component_1 = require('./setting/setting-detail/setting-detail.component');
var setting_filter_pipe_1 = require('./setting/setting-filter/setting-filter.pipe');
var datefilter_1 = require('./notifications/notifications-filter/datefilter');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.routing,
                forms_1.FormsModule,
                http_1.HttpModule,
                ng2_pagination_1.Ng2PaginationModule,
                ng2_charts_1.ChartsModule,
                ng2_tag_input_1.TagInputModule,
                angular2_modal_1.ModalModule.forRoot(),
                bootstrap_1.BootstrapModalModule
            ],
            providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }, product_service_1.ProductService, contacts_service_1.ContactsService, contact_service_1.ContactNotifiService, notifications_service_1.NotificationsService, yeucauban_service_1.YeucaubanService, Contact_service_1.ContactService, notifi_service_1.NotifiService, tag_service_1.TagService, setting_service_1.SettingService],
            declarations: [
                app_component_1.AppComponent,
                notification_component_1.NotifiSendComponent,
                setting_list_component_1.SettingListComponent,
                setting_create_component_1.SettingCreateComponent,
                setting_edit_component_1.SettingEditComponent,
                setting_delete_component_1.SettingDeleteComponent,
                setting_detail_component_1.SettingDetailComponent,
                setting_filter_pipe_1.SettingFilterPipe,
                welcome_component_1.WelcomeComponent,
                notifications_list_component_1.NotificationsListComponent,
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
                confirm_component_1.ConfirmComponent,
                Contact_list_component_1.ContactListComponent,
                Contact_detail_component_1.ContactDetailComponent,
                Contact_filter_pipe_1.ContactFilterPipe,
                Contact_update_component_1.ModalContactUpdate,
                notifications_list_component_1.NotificationsListComponent,
                notifications_detail_component_1.NotificationstDetailComponent,
                notifications_detailedit_component_1.NotificationstDetailEditComponent,
                notifications_filter_pipe_1.NotificationFilterPipe,
                datefilter_1.DateFilterPipe
            ],
            bootstrap: [app_component_1.AppComponent],
            entryComponents: [Contact_update_component_1.ModalContactUpdate]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
