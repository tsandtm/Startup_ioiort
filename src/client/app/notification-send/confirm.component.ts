import { Component,OnInit,Input,OnDestroy,AfterViewInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Appkey } from './shared/app.model';
import { Notifi,SentUser,UpdateData,InsertUser } from './shared/notifi.model';
import { AppService } from './shared/app.service';
import { NotifiService } from './shared/notifi.service';

import { PushService } from './shared/pushservice.service';
@Component({
    templateUrl: '/notification-send/confirm.component.html',
    providers: [AppService,NotifiService,PushService]

})
export class ConfirmComponent implements OnInit {
    @Input() notifi:Notifi;
    @Input() sl:number;
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
        this.sl=0;
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
            this.sentUser = sent;
            console.log(this.sentUser);
        })
    }
    getSL(id:number){
        this.notifiservice.getSL(id)
        .then(sl=>{
            this.sl=sl;
            console.log(this.sl);
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
        this._router.navigate(['notification']);
    }
    SaveAsDraft(): void {
        this._router.navigate(['notification']);
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
    }
    ngAfterViewInit()
    {
        $(".js-data-example-ajax").select2({
            placeholder:"Test",
                allowClear: true, 
                ajax: {
                    url: "/api/Contactnotifi",
                    dataType: 'json',
                    delay: 500,
                    data: function (params) {
                        return {
                            id: params.term, // search term
                            page: params.page,
                            };
                        },
                        processResults: function (data, params) {
                        // parse the results into the format expected by Select2
                        // since we are using custom formatting functions we do not need to
                        // alter the remote JSON data, except to indicate that infinite
                        // scrolling can be used
                        var i=1;
                            params.page = params.page || 0;
                            return {
                                results:
                                $.map(data, function(obj) {
                                    i+=10;
                                    return { id: obj.ContactID, text: obj.TaiKhoan };
                                }),
                                pagination: {
                                more: (params.page * 10) < i
                                }
                            };
                        },
                        cache: true
                    },
                    
                    minimumInputLength: 1,
                    escapeMarkup: function (markup) { return markup; }, 
            });
    }
}
