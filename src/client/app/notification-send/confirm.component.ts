
import { Component,OnInit,Input,OnDestroy } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Appkey } from './shared/app.model';
import { Notifi,SLSend,SentUser,UpdateData,InsertUser } from './shared/notifi.model';
import { AppService } from './shared/app.service';
import { NotifiService } from './shared/notifi.service';

import { PushService } from './shared/pushservice.service';
@Component({
    templateUrl: '/notification-send/confirm.component.html',
    providers: [AppService,NotifiService,PushService]

})
export class ConfirmComponent implements OnInit {
    @Input() notifi:Notifi;
    @Input() sl:SLSend;
    @Input() sentUser:SentUser[];
    @Input() updatedata:UpdateData;
    appkey:Appkey;
    insertUser:InsertUser;
    Douutien:string;
    date:Date;
    now:Date;
    
    token:string;
    constructor(private appService: AppService,
    private notifiservice:NotifiService,
    private pushservice:PushService,
    private _router: Router,
    private _route: ActivatedRoute) {

    }
    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            let id = +params["id"];
            this.getNotifi(id).then(result=>{
                this.getSL(id);
                this.getSentUser(id);
                this.getAppkey(this.notifi.AppID);
            });
        })
    }
    Push(){
        this.pushservice.sendMessage(this.appkey.APIKey,this.token,this.notifi.TieuDe,this.notifi.Noidung);
    }

    getNotifi(id: number):Promise<void> {
        return this.notifiservice.getOne(id)          
            .then(notifi => {
                this.notifi = notifi;
                if(this.notifi.DoUuTien==1){
                    this.Douutien="Normal";
                }
                else if(this.notifi.DoUuTien==2){
                    this.Douutien="High";
                }
            })
    }
    getSentUser(id: number) {
        this.notifiservice.getSendUser(id)
            .then(sent => {
            this.sentUser = sent})
    }
    getSL(id:number){
        this.notifiservice.getSL(id)
        .then(sl=>{
            this.sl=sl
        })
    }
    getAppkey(id:number){
        this.appService.getAppkey(id).then(key=>this.appkey=key);
    }
    Update(status:number){
        this._route.params.forEach((params: Params) => {
            let id = +params["id"];
        this.updatedata={
        Trangthai:status,
        NotifiID:id};
        this.notifiservice.Update(this.updatedata);
        })
    }
    Insert(){
            this.sentUser.forEach(element => {
                this.insertUser={
                    ContactID:element.ContactID,
                    NotifiID:element.NotifiID,
                    TrangThai:null,
                    ThoiGianDaGoi:null,
                    ThoiGianCanGoi:null,
                    LogLoi:null,
                    SoLanGoi:null
                };
                this.notifiservice.Insert(this.insertUser);
            });
        this._router.navigate(['menu-list']);
    }
    SaveAsDraft(): void {
        this._router.navigate(['menu-list']);
    }
    Finish():void{
        this.now=new Date();
        this.date=new Date(this.notifi.Thoigiangui);
        if(this.date>this.now){
            this.Update(0);
        }
        else{
            this.Update(1);
        }
        this.Insert();
    }
}
