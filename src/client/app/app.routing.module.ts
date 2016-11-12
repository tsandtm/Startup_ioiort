import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './products/shared/product.service';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import {ContactsListComponent} from './contacts/contacts-list/contacts-list.component';
import {NotificationsListComponent} from './notifications/notifications-list/notifications-list.component';
import {NotificationstDetailComponent} from './notifications/notifications-detail/notifications-detail.component';
const appRoutes: Route[] = [
    { path: '', redirectTo: 'notification', pathMatch: 'full' },
    { path: 'book-list', component: BookListComponent },
    { path: 'book-detail', component: BookDetailComponent },
    { path: 'welcome', component: WelcomeComponent },
   // { path: 'products', component: ProductListComponent },
   // { path: 'product/:id', component: ProductDetailComponent},
    { path: 'menu-list', component: MenuListComponent },
    { path: 'contact', component: ContactsListComponent },
    { path: 'notification', component: NotificationsListComponent },
    { path: 'notification-detail/:id', component: NotificationstDetailComponent },
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);