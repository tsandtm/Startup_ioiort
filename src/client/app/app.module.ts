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


import {NewsListComponent} from './news/newslist/news-list.component';
import {NewsService} from './news/shared/news.service';
import {NewsFilter} from './news/newslist/news-list.filter';


@NgModule({
    imports: [BrowserModule,routing,FormsModule,HttpModule],

    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},ProductService,NewsService],

    declarations: [AppComponent,
    BookListComponent,
    BookDetailComponent,
    WelcomeComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductFilterPipe,
    StarComponent,
    NewsListComponent,
    NewsFilter],

    bootstrap: [AppComponent]
})
export class AppModule{}