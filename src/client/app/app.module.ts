import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy,HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';


import { Ng2PaginationModule } from 'ng2-pagination';


import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

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
import {NotificationsListComponent} from './notifications/notifications-list/notifications-list.component';
import {NotificationstDetailComponent} from './notifications/notifications-detail/notifications-detail.component';
import { NotificationFilterPipe } from './notifications/notifications-filter/notifications-filter.pipe';
import { NotificationsService } from './notifications/shared/notifications.service';
import { NotifiSendComponent } from './notification-send/notification.component';
import { NotificationstDetailEditComponent } from './notifications/notifications-detailedit/notifications-detailedit.component';
import { TagInputModule } from 'ng2-tag-input';
@NgModule({
    imports: [BrowserModule,routing,FormsModule,HttpModule, Ng2PaginationModule,TagInputModule],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},ProductService,NotificationsService],
    declarations: [AppComponent,
    BookListComponent,
    BookDetailComponent,
    WelcomeComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductFilterPipe,
    NotificationsListComponent,
    NotificationstDetailComponent,
    NotificationstDetailEditComponent,
    NotificationFilterPipe,
    StarComponent],
    bootstrap: [AppComponent]
})
export class AppModule{}