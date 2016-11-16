import {  PipeTransform, Pipe } from '@angular/core';
import { Tag } from '../shared/tag.model';

@Pipe({
    name: 'tagFilter'
})
export class TagFilterPipe implements PipeTransform {

    transform(value: Tag[], filterBy: string): Tag[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((tag: Tag) =>
            tag.tagnamedisplay.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}