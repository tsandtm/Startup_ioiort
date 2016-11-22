import { Component, OnInit, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

// Contact
import { Contact } from '../Shared/Contact.model';
import { ContactService } from '../Shared/Contact.service';
// Tag
import { Tag } from '../Shared/Tag.model';
import { TagService } from '../Shared/Tag.service';
// popup update
import { ModalContactUpdate } from '../Contact-update/Contact-update.component';
// Filter
import { ContactFilterPipe } from '../Contact-filter/Contact-filter.pipe'


@Component({
    selector: 'Contact-list',
    templateUrl: '/Contacts/Contact-list/Contact-list.component.html',
    styleUrls: ['/assets/shop-homepage.css'],
    providers: [
        ContactService,
        TagService,
        Modal
    ]
})
export class ContactListComponent implements OnInit {
    Contacts: Contact[];
    filter: string = '';
    ContactDetail: Contact;
    checkbox: boolean = false;
    public Tags: Tag[];

    constructor(private contactService: ContactService, private tagService: TagService, public modal: Modal, private _router: Router, private _route: ActivatedRoute) {
    }

    loadGetAll() {
        this.contactService.getContacts().then((result) => this.Contacts = result);
    }

    ngOnInit() {
        this.getContacts()
            .then(() => {
                return this.getTag();
            })
            .then(() => {
                console.log(this.Tags);
            })
            .catch((error) => {
                console.log('error: ' + error);
            });
    }

    getView(ValueContactID: number) {
        return this.modal.open(ModalContactUpdate, overlayConfigFactory({ ContactID: ValueContactID }, BSModalContext));
    }

    checkAlllist() {
        this.checkbox = !this.checkbox;
    }

    getContacts(): Promise<Contact[]> {
        return this.contactService.getContacts()
            .then((response) => {
                this.Contacts = response;
                return response;
            })
            .catch((error) => {
                return error;
            })
    }

    getTag(): Promise<Tag[]> {
        return this.tagService.getTags()
            .then((response) => {
                this.Tags = response;
                return this.Tags;
            })
            .catch((error) => {
                console.log(error)
                return error;
            });
    }

    orderByTag(valueTag: number){
        this.contactService.orderByTag(valueTag)
            .then((result) => {
                this.Contacts = result;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}