import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy,HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { routing } from './app.routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './products/shared/product.service';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductFilterPipe } from './products/product-filter/product-filter.pipe'
import { StarComponent} from './shared/star.component';
import { UsersService } from './users/shared/user.service';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent }  from './users/user-detail/user-detail.component';
import { SettingListComponent } from './setting/setting-list/setting-list.component';
import { SettingService } from './setting/shared/setting.service';
import { SettingCreateComponent } from './setting/setting-create/setting-create.component';
import { SettingEditComponent } from './setting/setting-edit/setting-edit.component';
import { SettingDeleteComponent } from './setting/setting-delete/setting-delete.component';
import { SettingDetailComponent } from './setting/setting-detail/setting-detail.component';
import { TagListComponent } from './tag/tag-list/tag-list.component';
import { TagService } from './tag/shared/tag.service';
import { TagCreateComponent } from './tag/tag-create/tag-create.component';
import { TagEditComponent } from './tag/tag-edit/tag-edit.component';
import { TagDetailComponent } from './tag/tag-detail/tag-detail.component';
import { TagDeleteComponent } from './tag/tag-delete/tag-delete.component';

@NgModule({
    imports: [BrowserModule,routing,FormsModule,HttpModule],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},ProductService,UsersService,SettingService,TagService],
    declarations: [AppComponent,
    UserListComponent,
    TagListComponent, 
    TagCreateComponent, 
    TagEditComponent,  
    TagDetailComponent,
    TagDeleteComponent,
    SettingListComponent,
    SettingCreateComponent,
    SettingEditComponent,
    SettingDeleteComponent,
    SettingDetailComponent,
    UserDetailComponent,
    BookListComponent,
    BookDetailComponent,
    WelcomeComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductFilterPipe,
    StarComponent],
    bootstrap: [AppComponent]
})
export class AppModule{}