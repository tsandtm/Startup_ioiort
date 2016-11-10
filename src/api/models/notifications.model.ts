import {ModelBase} from './model.base';


export class Notifications extends ModelBase {
    AppID:number;
    TieuDe: string;
    NoiDung: string;
    ThoiGianGui:Date;
    ThoiHanToiDa:Date;
    DoUuTien: number;
    TrangThaiGoi: number;
    SoLuong: number;
}