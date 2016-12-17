// angular 2 module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// modal module
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

// paging module
import { Ng2PaginationModule } from 'ng2-pagination';

// routing module
import { routing } from './app.routing.module';

//spinkit component
import { CubeGridComponent } from 'ng2-spin-kit/dist/spinners'

// component
import { AppComponent } from './app.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { WelcomeComponent } from './home/welcome.component';

// service
// import { LogService,StarComponent } from './shared';

import {LogService} from './shared/log.service';
import {StarComponent} from './shared/components/star.component';

import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {ProduceDetailModal} from './products/product-detail-modal/product-detail-modal.component';
import {ProductFilterPipe} from './products/product-filter/product-filter.pipe';
import {ProductListComponent} from './products/product-list/product-list.component';
import {ProductModalComponent} from './products/product-modal/product-modal.component';
import {CustomModal} from './products/product-modal/custom-modal.component';
import {Product} from './products/shared/product.model';
import {ProductService} from './products/shared/product.service';

// product things
// import {
//     CustomModal,
//     ProductFilterPipe,
//     ProductDetailComponent,
//     ProductListComponent,
//     ProductService,
//     ProduceDetailModal,
//     ProductModalComponent
// } from './products';






@NgModule({
    imports: [
        BrowserModule,
        routing,
        FormsModule,
        HttpModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
        Ng2PaginationModule],


    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
        ProductService,
        LogService],


    declarations: [AppComponent,
        BookListComponent,
        BookDetailComponent,
        WelcomeComponent,
        ProductDetailComponent,
        ProductListComponent,
        ProductFilterPipe,
        StarComponent,
        ProductModalComponent,
        CustomModal,
        ProduceDetailModal,
        CubeGridComponent],


    bootstrap: [AppComponent],


    entryComponents: [CustomModal, ProduceDetailModal]
})
export class AppModule { }