import {  PipeTransform, Pipe } from '@angular/core';
import { TinTuc } from '../shared/tintuc.model';

@Pipe({
    name: 'tintuctFilter'
})
export class TintuctFilterPipe implements PipeTransform {

    transform(value: TinTuc[], args: string[]): TinTuc[] {
        let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;
        return filter ? value.filter((tintuc: TinTuc) =>
            tintuc.TieuDe.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }
}
