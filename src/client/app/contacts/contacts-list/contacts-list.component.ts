import { Component,OnInit}  from '@angular/core';

import { Contacts } from '../shared/contacts.model';
import { ContactsService } from '../shared/contacts.service';


@Component({
    templateUrl: '/contacts/contacts-list/contacts-list.component.html'
    //styleUrls: ['/menu/menu-list/menu-list.component.css']
})
export class ContactsListComponent {
    pageTitle: string = 'Contacts List'; 
    contacts:Contacts[];
    constructor(private _contactsService: ContactsService) {

    }

    ngOnInit(): void {
        this._contactsService.getList()
                .then(contacts => this.contacts = contacts)
    }
}