import { Component,OnInit,Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Appkey } from './shared/app.model';
import { Notifi,SLSend,SentUser,UpdateData,InsertUser } from './shared/notifi.model';
import { AppService } from './shared/app.service';
import { NotifiService } from './shared/notifi.service';
@Component({
    templateUrl: '/notification-send/confirm.component.html',
    providers: [AppService,NotifiService]
})
export class ConfirmComponent implements OnInit {
    @Input() notifi:Notifi;
    @Input() sl:SLSend;
    @Input() sentUser:SentUser[];
    @Input() updatedata:UpdateData;
    insertUser:InsertUser;
    Douutien:string;
    date:Date;
    now:Date;
    constructor(private appService: AppService,
    private notifiservice:NotifiService,
    private _router: Router,
    private _route: ActivatedRoute) {

    }
    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            let id = +params["id"];
            this.getNotifi(id).then(result=>{
            if(this.notifi.SendTag.length==0 && this.notifi.SendUser.length==0){
                this.getSLDenied(id);
                this.getSentUserDenied(id);
            }
            else{
                this.getSL(id);
                this.getSentUser(id);
            }
            });
        })
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
    getSentUserDenied(id: number) {
        this.notifiservice.getSendUserDenied(id)
            .then(sent => {
            this.sentUser = sent})
    }
    getSLDenied(id:number){
        this.notifiservice.getSLDenied(id)
        .then(sl=>{
            this.sl=sl
        })
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
        this._router.navigate(['welcome']);
    }
    SaveAsDraft(): void {
        this._router.navigate(['welcome']);
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
