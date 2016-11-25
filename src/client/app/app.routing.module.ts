import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './products/shared/product.service';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import{DanhMucListComponent} from './danhmuc/danhmuc-list/danhmuc-list.component';
import{TinTucDetailsComponent} from './tintuc/tintucs-details/tintuc-details.component';
import {TinTucListComponent} from './tintuc/tintucs/tintuc-list.component';
//import{TestComponent} from './test/test.component';
const appRoutes: Route[] = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'book-list', component: BookListComponent },
    { path: 'book-detail', component: BookDetailComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailComponent},
    {path:'tintuc',component:TinTucListComponent},
    {path:'danhmuc',component:DanhMucListComponent},
    {path:'tintucs/:id',component:TinTucDetailsComponent},
   // {path:'test',component:TestComponent}
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);