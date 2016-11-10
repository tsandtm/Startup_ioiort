import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy,HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {routing} from './app.routing.module';
import {AppComponent} from './app.component';
import {BookListComponent} from './books/book-list/book-list.component';
import {BookDetailComponent} from './books/book-detail/book-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './products/shared/product.service';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import {ProductFilterPipe} from './products/product-filter/product-filter.pipe';
import {StarComponent} from './shared/star.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import {ContactsListComponent} from './contacts/contacts-list/contacts-list.component';
import {ContactsService} from './contacts/shared/contacts.service';
import {NotificationsListComponent} from './notifications/notifications-list/notifications-list.component';
import {NotificationstDetailComponent} from './notifications/notifications-detail/notifications-detail.component';
import { NotificationsService } from './notifications/shared/notifications.service';
@NgModule({
    imports: [BrowserModule,routing,FormsModule,HttpModule],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},ProductService,ContactsService,NotificationsService],
    declarations: [AppComponent,
    BookListComponent,
    BookDetailComponent,
    WelcomeComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductFilterPipe,
    MenuListComponent,
    ContactsListComponent,
    NotificationsListComponent,
    NotificationstDetailComponent,
    StarComponent],
    bootstrap: [AppComponent]
})
export class AppModule{}