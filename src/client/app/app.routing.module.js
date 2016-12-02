"use strict";
var router_1 = require('@angular/router');
var product_list_component_1 = require('./products/product-list/product-list.component');
var welcome_component_1 = require('./home/welcome.component');
var notification_component_1 = require('./notification-send/notification.component');
var product_detail_component_1 = require('./products/product-detail/product-detail.component');
var Report_component_1 = require('./Reports/Report/Report.component');
var menu_list_component_1 = require('./menu/menu-list/menu-list.component');
var contacts_list_component_1 = require('./contacts/contacts-list/contacts-list.component');
var notifications_list_component_1 = require('./notifications/notifications-list/notifications-list.component');
var notifications_detail_component_1 = require('./notifications/notifications-detail/notifications-detail.component');
var yeucauban_list_component_1 = require('./yeucauban/yeucauban-list/yeucauban-list.component');
var confirm_component_1 = require('./notification-send/confirm.component');
var Contact_list_component_1 = require('./Contacts/Contact-list/Contact-list.component');
var Contact_detail_component_1 = require('./Contacts/Contact-detail/Contact-detail.component');
var notifications_detailedit_component_1 = require('./notifications/notifications-detailedit/notifications-detailedit.component');
var setting_list_component_1 = require('./setting/setting-list/setting-list.component');
var setting_create_component_1 = require('./setting/setting-create/setting-create.component');
var setting_edit_component_1 = require('./setting/setting-edit/setting-edit.component');
var setting_delete_component_1 = require('./setting/setting-delete/setting-delete.component');
var setting_detail_component_1 = require('./setting/setting-detail/setting-detail.component');
var appRoutes = [
    { path: '', redirectTo: 'menu-list', pathMatch: 'full' },
    //{ path: 'book-list', component: BookListComponent },
    //{ path: 'book-detail', component: BookDetailComponent },
    { path: 'Reports', component: Report_component_1.BarChartDemoComponent },
    //{ path: 'welcome', component: WelcomeComponent },
    // { path: 'products', component: ProductListComponent },
    // { path: 'product/:id', component: ProductDetailComponent},
    { path: 'menu-list', component: menu_list_component_1.MenuListComponent },
    { path: 'contact', component: contacts_list_component_1.ContactsListComponent },
    { path: 'notification', component: notifications_list_component_1.NotificationsListComponent },
    { path: 'notification-detail/:id', component: notifications_detail_component_1.NotificationstDetailComponent },
    { path: 'yeucauban', component: yeucauban_list_component_1.YeucaubanListComponent },
    { path: 'notifi-send', component: notification_component_1.NotifiSendComponent },
    { path: 'confirm/:id', component: confirm_component_1.ConfirmComponent },
    { path: 'welcome', component: welcome_component_1.WelcomeComponent },
    { path: 'products', component: product_list_component_1.ProductListComponent },
    { path: 'product/:id', component: product_detail_component_1.ProductDetailComponent },
    { path: 'Contacts', component: Contact_list_component_1.ContactListComponent },
    { path: 'Contacts/:ContactID', component: Contact_detail_component_1.ContactDetailComponent },
    // { path: 'products', component: ProductListComponent },
    // { path: 'product/:id', component: ProductDetailComponent},
    { path: 'notification-detailedit/:id', component: notifications_detailedit_component_1.NotificationstDetailEditComponent },
    { path: 'setting-list', component: setting_list_component_1.SettingListComponent },
    { path: 'setting-create', component: setting_create_component_1.SettingCreateComponent },
    { path: 'setting-edit/:id', component: setting_edit_component_1.SettingEditComponent },
    { path: 'setting-detail/:id', component: setting_detail_component_1.SettingDetailComponent },
    { path: 'setting-delete/:id', component: setting_delete_component_1.SettingDeleteComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
