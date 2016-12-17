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
import { StarComponent } from './shared/star.component'

// service
import { LogService } from './shared';

// product things
import {
    CustomModal,
    ProductFilterPipe,
    ProductDetailComponent,
    ProductListComponent,
    ProductService,
    ProduceDetailModal,
    ProductModalComponent
} from './products';






@NgModule({
    imports: [
        BrowserModule,
        routing,
        FormsModule,
        HttpModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
        Ng2PaginationModule],


    providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy },
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