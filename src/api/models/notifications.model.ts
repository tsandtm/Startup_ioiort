import {ModelBase} from './model.base';


export class Notifications extends ModelBase {
    AppID:number;
    TieuDe: string;
    NoiDung: string;
    ThoiGianGui:string;
    ThoiHanToiDa:Date;
    DoUuTien: number;
    TrangThaiGoi: number;
    SoLuong: number;
}
export class SentContact extends ModelBase {
    ContactID:number;
    NotifiID:number;
    TrangThai:number;
    ThoiGianCanGoi:Date;
    LogLoi:string;
    SoLanGoi:number;
    ThoiGianDaGoi:Date;
}