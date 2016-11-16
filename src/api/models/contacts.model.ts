import {ModelBase} from './model.base';


export class Contacts extends ModelBase {
    Token: string;
    Email: string;
    TaiKhoan: string;
    Device: string;
    PhoneNumber: number;
    NgayTao: Date;
    FaceBook: string;
    Contact_Tag;
}