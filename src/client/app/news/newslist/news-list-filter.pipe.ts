import {PipeTransform, Pipe} from '@angular/core';
import {INews} from  '../shared/news.model';

@Pipe({
    name: 'newsFilter'
})

export class NewsFilter implements PipeTransform{
    
    transform(value: INews[], agrs: string[]): INews[]{
        let filter : string = agrs[0] ? agrs[0].toLocaleLowerCase(): null;
        return filter ? value.filter((news : INews) =>
        news.name.toLocaleLowerCase().indexOf(filter) !== -1 ): value;
    }

}