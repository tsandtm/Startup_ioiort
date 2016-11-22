import {  PipeTransform, Pipe } from '@angular/core';
import { Setting } from '../shared/setting.model';

@Pipe({
    name: 'settingFilter'
})
export class SettingFilterPipe implements PipeTransform {

    transform(value: Setting[], filterBy: string): Setting[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((set: Setting) =>
            set.appname.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}