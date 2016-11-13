import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './products/shared/product.service';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { SettingListComponent } from './setting/setting-list/setting-list.component';
import { SettingCreateComponent } from './setting/setting-create/setting-create.component';
import { SettingEditComponent } from './setting/setting-edit/setting-edit.component';
import { SettingDeleteComponent } from './setting/setting-delete/setting-delete.component';
import { SettingDetailComponent } from './setting/setting-detail/setting-detail.component';
import { TagListComponent } from './tag/tag-list/tag-list.component';
import { TagCreateComponent } from './tag/tag-create/tag-create.component';
import { TagEditComponent } from './tag/tag-edit/tag-edit.component';
import { TagDetailComponent } from './tag/tag-detail/tag-detail.component';
import { TagDeleteComponent } from './tag/tag-delete/tag-delete.component';

const appRoutes: Route[] = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'book-list', component: BookListComponent },
    { path: 'book-detail', component: BookDetailComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailComponent},
    { path: 'users', component: UserListComponent},
    { path: 'user/:id', component: UserDetailComponent} ,
    { path: 'setting-list',component: SettingListComponent },
    { path: 'create', component: SettingCreateComponent },
    { path: 'setting-edit/:id', component: SettingEditComponent },
    { path: 'setting-detail/:id', component: SettingDetailComponent },
    { path: 'setting-delete/:id', component: SettingDeleteComponent },
    { path: 'tag-list', component: TagListComponent },
    { path: 'tag-create', component: TagCreateComponent },
    { path: 'tag-edit/:id', component: TagEditComponent },
    { path: 'tag-detail/:id', component: TagDetailComponent },
    { path: 'tag-delete/:id', component: TagDeleteComponent }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);