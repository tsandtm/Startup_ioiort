import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { Contact } from '../Shared/Contact.model';
import { ContactService } from '../Shared/Contact.service';
import { ModalContactUpdate } from '../Contact-update/Contact-update.component';


@Component({
    selector: 'Contact-list',
    templateUrl: '/Contacts/Contact-list/Contact-list.component.html',
    styleUrls: ['/assets/shop-homepage.css'],
    providers: [ContactService, Modal]
})
export class ContactListComponent {
    Contacts: Contact[];
    filter: string;
    ContactDetail: Contact;
    checkbox: boolean = false;

    constructor(private contactService: ContactService, public modal: Modal, private _router: Router, private _route: ActivatedRoute) { }

    loadGetAll() {
        this.contactService.getContacts().then((result) => this.Contacts = result);
    }

    ngOnInit(): void {
        this.loadGetAll();
    }

    getView(ValueContactID: number) {
        return this.modal.open(ModalContactUpdate, overlayConfigFactory({ ContactID: ValueContactID }, BSModalContext));
    }

    checkAlllist() {
        this.checkbox = !this.checkbox;
    }


}