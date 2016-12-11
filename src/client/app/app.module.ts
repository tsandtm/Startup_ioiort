import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Ng2PaginationModule } from 'ng2-pagination';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { NotificationsModalContext } from './notifications/notifications-modal/notifications-modal.component';
import { routing } from './app.routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './products/shared/product.service';
import { NotifiService } from './notification-send/shared/notifi.service';
import { TagService } from './notification-send/shared/tag.service';
import { ContactNotifiService } from './notification-send/shared/contact.service';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { BarChartDemoComponent } from './Reports/Report/Report.component';
import { ProductFilterPipe } from './products/product-filter/product-filter.pipe';
import { StarComponent } from './shared/star.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
<<<<<<< HEAD
=======
import { ContactsListComponent } from './contacts/contacts-list/contacts-list.component';
import { ContactsService } from './contacts/shared/contacts.service';
>>>>>>> 205dde2a92aa1d9124a7518d553d22fcfd90b6c5
import { NotificationsListComponent } from './notifications/notifications-list/notifications-list.component';
import { NotificationstDetailComponent } from './notifications/notifications-detail/notifications-detail.component';
import { NotificationsService } from './notifications/shared/notifications.service';
import { YeucaubanListComponent } from './yeucauban/yeucauban-list/yeucauban-list.component';
import { YeucaubanService } from './yeucauban/shared/yeucauban.service';
import { NotifiSendComponent } from './notification-send/notification.component';
import { ConfirmComponent } from './notification-send/confirm.component';
//import {RlTagInputModule} from 'angular2-tag-input';
import { TagInputModule } from 'ng2-tag-input';
import * as io from 'socket.io-client';
import { ContactListComponent } from './Contacts/Contact-list/Contact-list.component';
// Trùng tên contactService  với thánh Võ
import { ContactService } from './Contacts/shared/Contact.service';
import { ModalContactUpdate } from './Contacts/Contact-update/Contact-update.component';
import { ModalTagCreate } from './Contacts/Tag-create/Tag-create.component';
import { NotificationFilterPipe } from './notifications/notifications-filter/notifications-filter.pipe';
import { NotificationDateFilterPipe } from './notifications/notifications-filter/notificationsdate-filter.pipe';
import { NotificationstDetailEditComponent } from './notifications/notifications-detailedit/notifications-detailedit.component';
import { SettingListComponent } from './setting/setting-list/setting-list.component';
import { SettingService } from './setting/shared/setting.service';
import { SettingCreateComponent } from './setting/setting-create/setting-create.component';
import { SettingEditComponent } from './setting/setting-edit/setting-edit.component';
import { SettingDeleteComponent } from './setting/setting-delete/setting-delete.component';
import { SettingDetailComponent } from './setting/setting-detail/setting-detail.component';
import { DateFilterPipe } from './notifications/notifications-filter/datefilter';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/Shared/login.service';
//spinkit component
import { FadingCircleComponent } from 'ng2-spin-kit/dist/spinners'
import { RotatingPlaneComponent } from './spinner/rotating-plane.component';
import { CircleComponent } from './spinner/circle';

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
<<<<<<< HEAD
        BootstrapModalModule
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, ProductService, ContactNotifiService, NotificationsService, YeucaubanService, ContactService, NotifiService, TagService, SettingService, LoginService],
    declarations: [
        AppComponent,
        NotifiSendComponent,

=======
        BootstrapModalModule,
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, ProductService, ContactsService, ContactNotifiService, NotificationsService, YeucaubanService, ContactService, NotifiService, TagService, SettingService],
    declarations: [
        AppComponent,
        NotifiSendComponent,
        CircleComponent,
>>>>>>> 205dde2a92aa1d9124a7518d553d22fcfd90b6c5
        SettingListComponent,
        SettingCreateComponent,
        SettingEditComponent,
        SettingDeleteComponent,
        SettingDetailComponent,
<<<<<<< HEAD
        SettingFilterPipe,

        WelcomeComponent,

        NotificationsListComponent,
        ProductDetailComponent, 
        ProductListComponent,
        ProductFilterPipe,

        BarChartDemoComponent,
        MenuListComponent,
=======
        WelcomeComponent,
        NotificationsListComponent,
        ProductDetailComponent,
        ProductListComponent,
        ProductFilterPipe,
        BarChartDemoComponent,
        MenuListComponent,
        ContactsListComponent,
>>>>>>> 205dde2a92aa1d9124a7518d553d22fcfd90b6c5
        NotificationsListComponent,
        NotificationstDetailComponent,
        YeucaubanListComponent,
        StarComponent,
        ConfirmComponent,
        ContactListComponent,
<<<<<<< HEAD
        ModalContactUpdate,
        ModalTagCreate,
=======
        ContactDetailComponent,
        ContactFilterPipe,
        ModalContactUpdate,
>>>>>>> 205dde2a92aa1d9124a7518d553d22fcfd90b6c5
        NotificationsListComponent,
        NotificationstDetailComponent,
        NotificationstDetailEditComponent,
        NotificationFilterPipe,
        DateFilterPipe,
<<<<<<< HEAD
        FadingCircleComponent,
        LoginComponent
    ], 
=======
        RotatingPlaneComponent
    ],
>>>>>>> 205dde2a92aa1d9124a7518d553d22fcfd90b6c5
    bootstrap: [AppComponent],
    entryComponents: [ModalContactUpdate, ModalTagCreate]

})
export class AppModule { }