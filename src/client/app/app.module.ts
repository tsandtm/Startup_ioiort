import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy,HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { routing } from './app.routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { StarComponent} from './shared/star.component';

import { SettingListComponent } from './setting/setting-list/setting-list.component';
import { SettingService } from './setting/shared/setting.service';
import { SettingCreateComponent } from './setting/setting-create/setting-create.component';
import { SettingEditComponent } from './setting/setting-edit/setting-edit.component';
import { SettingDeleteComponent } from './setting/setting-delete/setting-delete.component';
import { SettingDetailComponent } from './setting/setting-detail/setting-detail.component';
import { SettingFilterPipe } from './setting/setting-filter/setting-filter.pipe';

import { TagListComponent } from './tag/tag-list/tag-list.component';
import { TagService } from './tag/shared/tag.service';
import { TagCreateComponent } from './tag/tag-create/tag-create.component';
import { TagEditComponent } from './tag/tag-edit/tag-edit.component';
import { TagDetailComponent } from './tag/tag-detail/tag-detail.component';
import { TagDeleteComponent } from './tag/tag-delete/tag-delete.component';
import { TagFilterPipe } from './tag/tag-filter/tag-filter.pipe';

import { ContactsListComponent } from './contacts/contacts-list/contacts-list.component';
import { ContactFilterPipe } from './contacts/contacts-filter/contacts-filter.pipe';
import { ContactService } from './contacts/shared/contact.service';
import { ContactsCreateComponent } from './contacts/contacts-create/contacts-create.component';

@NgModule({
    imports: [BrowserModule,routing,FormsModule,HttpModule],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},SettingService,TagService,ContactService],
    declarations: [AppComponent,

    SettingListComponent,
    SettingCreateComponent,
    SettingEditComponent,
    SettingDeleteComponent,
    SettingDetailComponent,
    SettingFilterPipe,
    
    BookListComponent,
    BookDetailComponent,

    WelcomeComponent,


    StarComponent],
    bootstrap: [AppComponent]
})
export class AppModule{}