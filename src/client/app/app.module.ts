import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy,HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {ModalModule} from 'angular2-modal';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';

import {routing} from './app.routing.module';
import {AppComponent} from './app.component';
import {BookListComponent} from './books/book-list/book-list.component';
import {BookDetailComponent} from './books/book-detail/book-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './products/shared/product.service';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import {ProductFilterPipe} from './products/product-filter/product-filter.pipe'
import {StarComponent} from './shared/star.component'
import {ProductModalComponent} from './products/product-modal/product-modal.component';

@NgModule({
    imports: [BrowserModule,routing,FormsModule,HttpModule,ModalModule.forRoot(),BootstrapModalModule],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},ProductService],
    declarations: [AppComponent,
    BookListComponent,
    BookDetailComponent,
    WelcomeComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductFilterPipe,
    StarComponent,
    ProductModalComponent],
    bootstrap: [AppComponent]
})
export class AppModule{}