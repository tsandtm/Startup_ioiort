import {  PipeTransform, Pipe } from '@angular/core';
import { LoaiTinDang } from '../shared/loaitindang.model';

@Pipe({
    name: 'loaitindangFilter'
})
export class LoaiTinDangFilterPipe implements PipeTransform {

    transform(value: LoaiTinDang[], args: string[]): LoaiTinDang[] {
        let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;
        return filter ? value.filter((loaitindang: LoaiTinDang) =>
            loaitindang.TenGoi.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }
}
