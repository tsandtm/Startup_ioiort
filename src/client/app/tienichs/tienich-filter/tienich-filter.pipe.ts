import {  PipeTransform, Pipe } from '@angular/core';
import { TienIch } from '../shared/tienich.model';

@Pipe({
    name: 'tienichFilter'
})
export class TienIchFilterPipe implements PipeTransform {

    transform(value: TienIch[], args: string[]): TienIch[] {
        let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;
        return filter ? value.filter((tienich: TienIch) =>
            tienich.TenGoi.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }
}
