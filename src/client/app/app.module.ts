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
import { NotifiService } from './notification-send/shared/notifi.service';
import { TagService } from './notification-send/shared/tag.service';
import { ContactService } from './notification-send/shared/contact.service';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import {ProductFilterPipe} from './products/product-filter/product-filter.pipe'
import {StarComponent} from './shared/star.component'
import { NotifiSendComponent } from './notification-send/notification.component';
import { ConfirmComponent } from './notification-send/confirm.component';
//import {RlTagInputModule} from 'angular2-tag-input';
import { TagInputModule } from 'ng2-tag-input';
import * as io from 'socket.io-client';
@NgModule({
    imports: [BrowserModule,routing,FormsModule,HttpModule,TagInputModule],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},ProductService,NotifiService,TagService,ContactService],
    declarations: [AppComponent,
    NotifiSendComponent,
    BookListComponent,
    BookDetailComponent,
    WelcomeComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductFilterPipe,
    StarComponent,
    ConfirmComponent],
    bootstrap: [AppComponent]
})
export class AppModule{}