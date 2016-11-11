import {  PipeTransform, Pipe } from '@angular/core';
import { Contact } from '../shared/Contact.model';

@Pipe({
    name: 'ContactFilter'
})
export class ContactFilterPipe implements PipeTransform {

    transform(value: Contact[], args: string[]): Contact[] {
        let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;
        return filter ? value.filter((product: Contact) =>
            product.Email.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }
}
