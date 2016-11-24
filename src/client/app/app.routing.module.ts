import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './products/shared/product.service';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import {TinTuctListComponent} from './tintucs/tintuc-list/tintuc-list.component';
import {TintucDetailComponent} from './tintucs/tintuc-detail/tintuc-detail.component';


import { TienIchtListComponent} from './tienichs/tienich-list/tienich-list.component';
import {ThemtienichComponent} from './tienichs/themtienich/themtienich.component';
import {TienIchDetailComponent} from './tienichs/tienich-detail/tienich-detail.component';
import {SuatienichComponent} from './tienichs/suatienich/suatienich.component';

//
import {LoaiTinDangListComponent} from './loaitindangs/loaitindang-list/loaitindang-list.component';
import {ThemloaitindangComponent} from './loaitindangs/themloaitindang/themloaitindang.component';
import {LoaiTinDangDetailComponent} from './loaitindangs/loaitindang-detail/loaitindang-detail.component';
import {SuaLoaiTinDangComponent} from './loaitindangs/sualoaitindang/sualoaitindang.component';
const appRoutes: Route[] = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'book-list', component: BookListComponent },
    { path: 'book-detail', component: BookDetailComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailComponent},
    { path: 'tintucs',  component: TinTuctListComponent},
    { path: 'tintuc/:id', component: TintucDetailComponent},

    //
    {path: 'loaitindangs',component: LoaiTinDangListComponent},
    {path: 'themloaitindang',component: ThemloaitindangComponent},
    {path: 'loaitindang/:id', component: LoaiTinDangDetailComponent},
    {path: 'sualoaitindang/:id', component: SuaLoaiTinDangComponent},
    //
    {path: 'tienichs',component: TienIchtListComponent},
    {path: 'themtienich',component: ThemtienichComponent},
    {path: 'tienich/:id', component: TienIchDetailComponent},
    {path: 'suatienich/:id', component: SuatienichComponent},



]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);