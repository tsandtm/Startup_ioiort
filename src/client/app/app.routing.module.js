"use strict";
var router_1 = require('@angular/router');
var book_list_component_1 = require('./books/book-list/book-list.component');
var book_detail_component_1 = require('./books/book-detail/book-detail.component');
var product_list_component_1 = require('./products/product-list/product-list.component');
var welcome_component_1 = require('./home/welcome.component');
var product_detail_component_1 = require('./products/product-detail/product-detail.component');
var Contact_list_component_1 = require('./Contacts/Contact-list/Contact-list.component');
var Contact_detail_component_1 = require('./Contacts/Contact-detail/Contact-detail.component');
var appRoutes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'book-list', component: book_list_component_1.BookListComponent },
    { path: 'book-detail', component: book_detail_component_1.BookDetailComponent },
    { path: 'welcome', component: welcome_component_1.WelcomeComponent },
    { path: 'products', component: product_list_component_1.ProductListComponent },
    { path: 'product/:id', component: product_detail_component_1.ProductDetailComponent },
    { path: 'Contacts', component: Contact_list_component_1.ContactListComponent },
    { path: 'Contacts/:ContactID', component: Contact_detail_component_1.ContactDetailComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);