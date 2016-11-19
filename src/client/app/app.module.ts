import { NgModule} from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { LocationStrategy,HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Ng2PaginationModule } from 'ng2-pagination';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { NotificationsModalContext} from './notifications/notifications-modal/notifications-modal.component';
import { routing } from './app.routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './products/shared/product.service';
import { NotifiService } from './notification-send/shared/notifi.service';
import { TagService } from './notification-send/shared/tag.service';
import { ContactService } from './notification-send/shared/contact.service';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { BarChartDemoComponent } from './Reports/Report/Report.component';
import { ProductFilterPipe} from './products/product-filter/product-filter.pipe';
import { StarComponent} from './shared/star.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { ContactsListComponent} from './contacts/contacts-list/contacts-list.component';
import { ContactsService} from './contacts/shared/contacts.service';
import { NotificationsListComponent} from './notifications/notifications-list/notifications-list.component';
import { NotificationstDetailComponent} from './notifications/notifications-detail/notifications-detail.component';
import { NotificationsService } from './notifications/shared/notifications.service';
import { YeucaubanListComponent} from './yeucauban/yeucauban-list/yeucauban-list.component';
import { YeucaubanService } from './yeucauban/shared/yeucauban.service';
import { NotifiSendComponent } from './notification-send/notification.component';
import { ConfirmComponent } from './notification-send/confirm.component';
//import {RlTagInputModule} from 'angular2-tag-input';
import { TagInputModule } from 'ng2-tag-input';
import * as io from 'socket.io-client';
import { ContactListComponent } from './Contacts/Contact-list/Contact-list.component';
import { ContactFilterPipe } from './Contacts/Contact-filter/Contact-filter.pipe';
import { ContactDetailComponent } from './Contacts/Contact-detail/Contact-detail.component';
// Trùng tên contactService  với thánh Võ
import { ContactService } from './Contacts/shared/Contact.service';
import { ModalContactUpdate } from './Contacts/Contact-update/Contact-update.component';
import { NotificationFilterPipe } from './notifications/notifications-filter/notifications-filter.pipe';
import { NotificationstDetailEditComponent } from './notifications/notifications-detailedit/notifications-detailedit.component';
import { SettingListComponent } from './setting/setting-list/setting-list.component';
import { SettingService } from './setting/shared/setting.service';
import { SettingCreateComponent } from './setting/setting-create/setting-create.component';
import { SettingEditComponent } from './setting/setting-edit/setting-edit.component';
import { SettingDeleteComponent } from './setting/setting-delete/setting-delete.component';
import { SettingDetailComponent } from './setting/setting-detail/setting-detail.component';
import { SettingFilterPipe } from './setting/setting-filter/setting-filter.pipe';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        FormsModule,
        HttpModule, 
        Ng2PaginationModule,
        ChartsModule,
        TagInputModule,
        ModalModule.forRoot(),
        BootstrapModalModule
        ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},ProductService,ContactsService,NotificationsService,YeucaubanService,ContactService,NotifiService,TagService,SettingService ],
    declarations: [
    AppComponent,
    NotifiSendComponent,

    SettingListComponent,
    SettingCreateComponent,
    SettingEditComponent,
    SettingDeleteComponent,
    SettingDetailComponent,
    SettingFilterPipe,

    WelcomeComponent,

    ProductDetailComponent,
    ProductListComponent,
    ProductFilterPipe,

    BarChartDemoComponent,
    MenuListComponent,
    ContactsListComponent,
    NotificationsListComponent,
    NotificationstDetailComponent,
    YeucaubanListComponent,
    StarComponent,
    ConfirmComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactFilterPipe,
    ModalContactUpdate,
    NotificationsListComponent,
    NotificationstDetailComponent,
    NotificationstDetailEditComponent,
    NotificationFilterPipe,
    ],
    bootstrap: [AppComponent],
    entryComponents: [ModalContactUpdate]

})
export class AppModule { }