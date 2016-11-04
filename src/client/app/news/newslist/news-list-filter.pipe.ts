import { PipeTransform, Pipe } from '@angular/core';
import { INews } from '../shared/news.model';

@Pipe({
    name: 'newsFilter'
})

export class NewsFilter implements PipeTransform {

    transform(value: INews[], agrs: string): INews[] {
        let filter: string = agrs ? agrs.toLocaleLowerCase() : null;
        return filter ? value.filter((news: INews) => {
            console.log('value: ' + filter);
            console.log('index: ' + news.name.toLocaleLowerCase().indexOf(filter))
            return news.name.toLocaleLowerCase().indexOf(filter) !== -1;
        }
        ) : value;
    }

}