"use strict";
var router_1 = require('@angular/router');
var book_list_component_1 = require('./books/book-list/book-list.component');
var book_detail_component_1 = require('./books/book-detail/book-detail.component');
var notification_component_1 = require('./notification-send/notification.component');
var Report_component_1 = require('./Reports/Report/Report.component');
var menu_list_component_1 = require('./menu/menu-list/menu-list.component');
var contacts_list_component_1 = require('./contacts/contacts-list/contacts-list.component');
var notifications_list_component_1 = require('./notifications/notifications-list/notifications-list.component');
var notifications_detail_component_1 = require('./notifications/notifications-detail/notifications-detail.component');
var yeucauban_list_component_1 = require('./yeucauban/yeucauban-list/yeucauban-list.component');
var confirm_component_1 = require('./notification-send/confirm.component');
var appRoutes = [
    { path: '', redirectTo: 'notification', pathMatch: 'full' },
    { path: 'book-list', component: book_list_component_1.BookListComponent },
    { path: 'book-detail', component: book_detail_component_1.BookDetailComponent },
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
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
