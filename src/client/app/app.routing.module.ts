import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './products/shared/product.service';
import { WelcomeComponent } from './home/welcome.component';
import { NotifiSendComponent } from './notification-send/notification.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ConfirmComponent } from './notification-send/confirm.component';

const appRoutes: Route[] = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'book-list', component: BookListComponent },
    { path: 'book-detail', component: BookDetailComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'notifi-send', component: NotifiSendComponent },
    { path: 'confirm/:id', component: ConfirmComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailComponent}
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);