import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './products/shared/product.service';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ContactListComponent } from './Contacts/Contact-list/Contact-list.component';
import { ContactDetailComponent } from './Contacts/Contact-detail/Contact-detail.component';

const appRoutes: Route[] = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'book-list', component: BookListComponent },
    { path: 'book-detail', component: BookDetailComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'Contacts', component: ContactListComponent },
    { path: 'Contacts/:ContactID', component: ContactDetailComponent}
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);