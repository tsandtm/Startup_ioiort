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
// login
import { LoginService } from '../../login/Shared/login.service';
// popup update contact
import { ModalContactUpdate } from '../Contact-update/Contact-update.component';
//popup create tag
import { ModalTagCreate } from '../Tag-create/Tag-create.component';



@Component({
    selector: 'Contact-list',
    templateUrl: '/Contacts/Contact-list/Contact-list.component.html',
    styleUrls: ['/assets/shop-homepage.css'],
    providers:
    [
        ContactService,
        TagService,
        LoginService,
        Modal
    ]
})
export class ContactListComponent {
    Contacts: Contact[];
    AccountFilter = "";
    // ContactDetail: Contact;
    checkbox: boolean = false;
    Tags: Tag[];
    pager: any = {};
    itempages: Contact[];
    isRequest: boolean = true;
    isSearch: boolean = false;
    isSearchAccount: boolean = false;
    ValueSearch: string;
    ValueSearchAccount: string;
    Total: number = 0;
    SessionAccountID: string;

    constructor(private contactService: ContactService, private tagService: TagService, private loginService: LoginService, public modal: Modal, private _router: Router, private _route: ActivatedRoute) {
    }

    loadGetAll() {
        this.getTag()
            .then((result) => {
                this.Tags = result;
                return this.Tags;
            })
            .catch((err) => {
                console.log('error');
            });
        this.contactService.getContacts(0)
            .then((result) => {
                this.Contacts = result;
                this.Total = this.Contacts[0].Total;
                return this.Contacts;
            })
            .then((result) => {
                this.setPage(1);
            })
    }

    setPage(page: number): void {
        this.isRequest = true;
        if (this.Contacts != undefined) {
            if (page < 1 || page > this.pager.totalPages) {
                this.isRequest = false;
                return;
            }
            if (this.Contacts.length == 0) {
                this.Contacts = [];
                this.pager = [];
                this.isRequest = false;
                this.itempages = [];
                return;
            }
            if (this.isSearch == false && this.isSearchAccount == false) {
                this.contactService.getContacts(page - 1)
                    .then((response) => {
                        this.Contacts = response;
                        this.Total = this.Contacts[0].Total;
                        return this.Contacts;
                    })
                    .then(() => {
                        this.pager = this.contactService.GetPager(this.Contacts[0].Total, page);
                        // get current page of items
                        this.itempages = this.Contacts.slice(0, 25);
                        this.isRequest = false;
                    })
            }
            else if (this.isSearchAccount == true) {
                this.contactService.SearchByAccount(this.AccountFilter, page - 1)
                    .then((response) => {
                        this.Contacts = response;
                        this.Total = this.Contacts[0].Total;
                        return this.Contacts;
                    })
                    .then((response) => {
                        this.pager = this.contactService.GetPager(this.Contacts[0].Total, page);
                        // get current page of items
                        this.itempages = this.Contacts.slice(0, 25);
                        this.isRequest = false;
                    })
            }
            else if (this.isSearch == true) {
                this.contactService.SearchByTag(this.ValueSearch, page - 1)
                    .then((response) => {
                        this.Contacts = response;
                        this.Total = this.Contacts[0].Total;
                        return this.Contacts;
                    })
                    .then((response) => {
                        this.pager = this.contactService.GetPager(this.Contacts[0].Total, page);
                        // get current page of items
                        this.itempages = this.Contacts.slice(0, 25);
                        this.isRequest = false;
                    })
            }
        }
    }

    ngOnInit() {
        this.loginService.GetSession()
            .then((response) => {
                this.SessionAccountID = response._body;
                return this.SessionAccountID;
            })
            .then((response) => {
                console.log(this.SessionAccountID);
                if (this.SessionAccountID == "error") {
                    this._router.navigate(["login"]);
                }
                else {
                    return this.SessionAccountID;
                }
            })
            .then((response) => {
                this.loadGetAll();
            })
    }

    getView(ValueContactID: number) {
        return this.modal.open(ModalContactUpdate, overlayConfigFactory({ ContactID: ValueContactID }, BSModalContext))
            .then(d => d.result)
            .then((r) => {
                if (r == "ok") {
                    this.contactService.getContacts(0)
                        .then((result) => {
                            this.Contacts = result;
                            this.Total = this.Contacts[0].Total;
                            return this.Contacts;
                        })
                        .then((result) => {
                            this.setPage(1);
                            return this.itempages;
                        })
                }
            });
    }

    checkAlllist() {
        this.checkbox = !this.checkbox;
    }

    getContacts(): Promise<Contact[]> {
        this.isRequest = true;
        return this.contactService.getContacts(1)
            .then((response) => {
                this.Contacts = response;
                this.Total = this.Contacts[0].Total;
                return response;
            })
            .catch((error) => {
                return error;
            })
    }

    getTag(): Promise<Tag[]> {
        this.isRequest = true;
        return this.tagService.getTags(this.SessionAccountID)
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
        this.isSearchAccount = false;
        this.isSearch = true;
        this.isRequest = true;
        this.contactService.SearchByTag(Contact_TagName, 0)
            .then((result) => {
                this.Contacts = result;
                if (this.Contacts.length != 0) {
                    this.Total = this.Contacts[0].Total;
                }
                else {
                    this.Total = 0;
                }
                return this.Contacts;
            })
            .then((result) => {
                this.ValueSearch = Contact_TagName;
                this.setPage(1);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    SearchByAccount() {
        this.isSearch = false;
        this.isSearchAccount = true;
        this.isRequest = true;
        this.contactService.SearchByAccount(this.AccountFilter, 0)
            .then((result) => {
                this.Contacts = result;
                if (this.Contacts.length != 0) {
                    this.Total = this.Contacts[0].Total;
                }
                else {
                    this.Total = 0;
                }
                return this.Contacts;
            })
            .then((result) => {
                this.setPage(1);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    CreateTag() {
        return this.modal.open(ModalTagCreate, overlayConfigFactory({ AccountID: 1 }, BSModalContext))
            .then(d => d.result)
            .then((r) => {
                if (r == "ok") {
                    this.getTag()
                        .then((result) => {
                            this.isRequest = false;
                            this.Tags = result;
                            return this.Tags;
                        })
                }
            });
    }
 
}