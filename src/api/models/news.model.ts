import {ModelBase} from './model.base';


export class ListNews extends ModelBase {
    name: string;
    description:string;
    content : string;
    datepub: Date;
    imgurl : string;
    
}