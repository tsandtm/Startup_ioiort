import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy,HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { ChartsModule } from 'ng2-charts/ng2-charts';

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
import { ContactListComponent } from './Contacts/Contact-list/Contact-list.component';
//BarChartDemoComponent
import { BarChartDemoComponent } from './Reports/Report/Report.component';

@NgModule({
    imports: [BrowserModule,routing,FormsModule,HttpModule,ChartsModule],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},ProductService],
    declarations: [AppComponent,
    BookListComponent,
    BookDetailComponent,
    WelcomeComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductFilterPipe,
    StarComponent,
    ContactListComponent,
    BarChartDemoComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule{}