import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
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
    providers:
    [
        ContactService,
        TagService,
        Modal
    ]
})
export class ContactListComponent {
    Contacts: Contact[];
    filter: string = '';
    // ContactDetail: Contact;
    checkbox: boolean = false;
    Tags: Tag[];
    pager: any = {};
    itempages: Contact[];

    constructor(private contactService: ContactService, private tagService: TagService, public modal: Modal, private _router: Router, private _route: ActivatedRoute) {
    }

    loadGetAll() {
        this.contactService.getContacts()
            .then((result) => this.Contacts = result);
    }

    setPage(page: number): void {
        if (this.Contacts != undefined) {
            if (page < 1 || page > this.pager.totalPages) {
                return;
            }
            
            this.pager = this.contactService.getPager(this.Contacts.length, page);
            // get current page of items
            this.itempages = this.Contacts.slice(this.pager.startIndex, this.pager.endIndex + 1);
            console.log(this.itempages);
        }
    }

    runGetContacts() {
        this.getContacts()
            .then(() => {
                this.getTag();
                console.log(this.Contacts);
            })
            .then((result) => {
                this.setPage(1);
            })
            .catch((error) => {
                console.log('error: ');
            });
    }

    ngOnInit() {
        this.runGetContacts();
    }

    getView(ValueContactID: number) {
        return this.modal.open(ModalContactUpdate, overlayConfigFactory({ ContactID: ValueContactID }, BSModalContext))
            .then(d => d.result)
            .then((r) => {
                if (r == "ok") {
                    this.runGetContacts()
                }
            });
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
                let TagAll = new Tag();
                TagAll.TagNameDisplay = "All";
                this.Tags = response;
                this.Tags.push(TagAll);
                return this.Tags;
            })
            .catch((error) => {
                console.log(error)
                return error;
            });
    }

    SearchByTag(Contact_TagName: string) {
        this.contactService.SearchByTag(Contact_TagName)
            .then((result) => {
                this.Contacts = result;
                console.log('search: '+this.Contacts);
                return this.Contacts;
            })
            .then((result) => {
                console.log("vao ");
                this.setPage(1);
            })
            .catch((error) => {
                console.error(error);
            });
    }
}