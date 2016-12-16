import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './products/shared/product.service';
import { WelcomeComponent } from './home/welcome.component';
import { NotifiSendComponent } from './notification-send/notification.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { BarChartDemoComponent } from './Reports/Report/Report.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
<<<<<<< HEAD
import { ContactsListComponent } from './contacts/contacts-list/contacts-list.component';
import { NotificationsListComponent } from './notifications/notifications-list/notifications-list.component';
import { NotificationstDetailComponent } from './notifications/notifications-detail/notifications-detail.component';
import { YeucaubanListComponent } from './yeucauban/yeucauban-list/yeucauban-list.component';
import { ConfirmComponent } from './notification-send/confirm.component';
import { ContactListComponent } from './Contacts/Contact-list/Contact-list.component';
import { ContactDetailComponent } from './Contacts/Contact-detail/Contact-detail.component';
import { NotificationstDetailEditComponent } from './notifications/notifications-detailedit/notifications-detailedit.component';
=======
import { NotificationsListComponent} from './notifications/notifications-list/notifications-list.component';
import { NotificationstDetailComponent} from './notifications/notifications-detail/notifications-detail.component';
import { YeucaubanListComponent} from './yeucauban/yeucauban-list/yeucauban-list.component';
import { ConfirmComponent } from './notification-send/confirm.component';
import { ContactListComponent } from './Contacts/Contact-list/Contact-list.component';
import {NotificationstDetailEditComponent} from './notifications/notifications-detailedit/notifications-detailedit.component';
>>>>>>> c673b48189d43e88582aceadb665102779e03bdd
import { SettingListComponent } from './setting/setting-list/setting-list.component';
import { SettingCreateComponent } from './setting/setting-create/setting-create.component';
import { SettingEditComponent } from './setting/setting-edit/setting-edit.component';
import { SettingDeleteComponent } from './setting/setting-delete/setting-delete.component';
import { SettingDetailComponent } from './setting/setting-detail/setting-detail.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Route[] = [
    { path: '', redirectTo: 'menu-list', pathMatch: 'full' },
    //{ path: 'book-list', component: BookListComponent },
    //{ path: 'book-detail', component: BookDetailComponent },
    { path: 'Reports', component: BarChartDemoComponent },
    //{ path: 'welcome', component: WelcomeComponent },
    // { path: 'products', component: ProductListComponent },
    // { path: 'product/:id', component: ProductDetailComponent},
    { path: 'menu-list', component: MenuListComponent },
    { path: 'notification', component: NotificationsListComponent },
    { path: 'notification-detail/:id/:id2', component: NotificationstDetailComponent },
    { path: 'yeucauban', component: YeucaubanListComponent },
    { path: 'notifi-send', component: NotifiSendComponent },
    { path: 'confirm/:id', component: ConfirmComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'Contacts', component: ContactListComponent },
<<<<<<< HEAD
    { path: 'Contacts/:ContactID', component: ContactDetailComponent },
    // { path: 'products', component: ProductListComponent },
    // { path: 'product/:id', component: ProductDetailComponent},
    { path: 'notification-detailedit/:id', component: NotificationstDetailEditComponent },
=======
   // { path: 'products', component: ProductListComponent },
   // { path: 'product/:id', component: ProductDetailComponent},
    { path: 'notification-detailedit/:id/:id2', component: NotificationstDetailEditComponent },
>>>>>>> c673b48189d43e88582aceadb665102779e03bdd

    { path: 'setting-list', component: SettingListComponent },
    { path: 'setting-create', component: SettingCreateComponent },
    { path: 'login', component: LoginComponent  },
    { path: 'setting-edit/:id/:id2', component: SettingEditComponent },
    { path: 'setting-detail/:id/:id2', component: SettingDetailComponent },
    { path: 'setting-delete/:id/:id2', component: SettingDeleteComponent }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);