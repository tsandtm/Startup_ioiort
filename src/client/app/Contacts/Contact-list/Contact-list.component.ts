import { Component, OnInit } from '@angular/core';
import { Contact } from '../Shared/Contact.model';
import { ContactService } from '../Shared/Contact.service';

@Component({
    selector: 'Contact-list',
    templateUrl: '/Contacts/Contact-list/Contact-list.component.html',
    styleUrls: ['/assets/shop-homepage.css'],
    providers: [ContactService]
})
export class ContactListComponent implements OnInit {
    Contacts: Contact[];
    filter: string;

    constructor(private contactService: ContactService) {

    }

    loadGetAll() {
        this.contactService.getProducts().then( (result) => this.Contacts = result);
    }

    ngOnInit(): void {
        this.loadGetAll();
    }


}


