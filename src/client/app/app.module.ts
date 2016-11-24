import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2PaginationModule } from 'ng2-pagination'; // <-- import the module


import { routing } from './app.routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './products/shared/product.service';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductFilterPipe } from './products/product-filter/product-filter.pipe'
import { StarComponent } from './shared/star.component';
import { TinTuctListComponent } from './tintucs/tintuc-list/tintuc-list.component';
import { TintucService } from './tintucs/shared/tintuc.service';
import { TintuctFilterPipe } from './tintucs/tintuc-filter/tintuc-filter.pipe';
import { TintucDetailComponent } from './tintucs/tintuc-detail/tintuc-detail.component';
import { TienIchtListComponent } from './tienichs/tienich-list/tienich-list.component';
import { TienIchService } from './tienichs/shared/tienich.service';
import { ThemtienichComponent } from './tienichs/themtienich/themtienich.component';
import { SuatienichComponent } from './tienichs/suatienich/suatienich.component';
import { TienichDetailComponent } from './tienichs/tienich-detail/tienich-detail.component';
import { TienichFilterPipe } from './tienichs/tienich-filter/tienich-filter.pipe';


@NgModule({
    imports: [BrowserModule, routing, FormsModule, HttpModule, Ng2PaginationModule],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, ProductService, TintucService, TienIchService, Ng2PaginationModule],
    declarations: [AppComponent,
        BookListComponent,
        BookDetailComponent,
        WelcomeComponent,
        ProductDetailComponent,
        ProductListComponent,
        ProductFilterPipe,
        StarComponent,
        TinTuctListComponent,
        TintuctFilterPipe,
        TintucDetailComponent,
        TienIchtListComponent,
        ThemtienichComponent,
        SuatienichComponent,
        TienichDetailComponent,
        TienichFilterPipe],
    bootstrap: [AppComponent]
})
export class AppModule { }