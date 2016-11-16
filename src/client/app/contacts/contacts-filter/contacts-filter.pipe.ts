import {  PipeTransform, Pipe } from '@angular/core';
import { Contact } from '../shared/Contact.model';

@Pipe({
    name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {

    transform(value: Contact[], filterBy: string): Contact[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((tag: Contact) =>
            tag.TaiKhoan.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}