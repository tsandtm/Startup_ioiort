import { Component,OnInit,Input,AfterViewInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Appkey } from './shared/app.model';
import { Notifi } from './shared/notifi.model';
import { Tag } from './shared/tag.model';
import { Contact } from './shared/Contact.model';
import { AppService } from './shared/app.service';
import { NotifiService } from './shared/notifi.service';
import { ContactNotifiService } from './shared/contact.service';
import { TagService } from './shared/tag.service';
@Component({
    templateUrl: '/notification-send/notification.component.html',
    providers: [AppService,NotifiService,ContactNotifiService,TagService]
})
export class NotifiSendComponent implements OnInit{
    //Tag
    listIDTag=[];
    listNameTag=[];
    Tag:Tag[];
    //Contact
    countContact=0;
    listIDContact=[];
    listNameContact=[];
    Contact:Contact[];
    //TagDenied
    listIDTagDenied=[];
    listNameTagDenied=[];
    //ContactDenied
    listIDContactDenied=[];
    listNameContactDenied=[];
    //----//
    sendnow: boolean = true;
    sendlater: boolean = false;
    Apps: Appkey[];
    AppID:number=1;
    notifi:Notifi;
    notifiID:number;
    tieude:string;
    Noidung:string;
    Thoigiangui:string;
    thoiHanDV:string="Week";
    thoiHannum:number=1;
    ThoiHan:string;
    doUuTien:number=1;
    Trangthai:number=2;
            //0=Waiting
            //1=Complete
            //2=Draft
    Soluong:number;
    today:Date;
    date:Date;
    hour:number=12;
    minute:number=0;
    loophour:number[];
    loopminute:number[];
    loopdayTH:number[];
    loophourTH:number[];
    loopminuteTH:number[];
    public pageTitle: string = 'Notification';
    constructor(private appService: AppService,
    private notifiservice:NotifiService,
    private tagservice:TagService,
    private contactservice:ContactNotifiService,
    private _router: Router,
    private _route: ActivatedRoute) {

    }
    loop(min,max){
        var input=[];
        for(var i=min;i<max;i++){
            input.push(i);
        }
        return input;
    }
    delPos(ar:Array<number>,key:number){
        for(var i=0;i<=ar.length;i++){
            if(ar[i]==key){
                ar.splice(i,1);
            }
        }
    }
    delPosstring(ar:Array<string>,key:string){
        for(var i=0;i<=ar.length;i++){
            if(ar[i]==key){
                ar.splice(i,1);
            }
        }
    }
    getNotifi() {
        this.notifiservice.getLastNotifi()
            .then(notifi => this.notifi = notifi)
    }
    sendnowclick(): void {
        this.sendnow = true;
        this.sendlater=false;
    }
    sendlaterclick(): void {
        this.sendnow = false;
        this.sendlater=true;
    }
        // var pos=item.indexOf('.');
        // var num=item.slice(0,pos);
        // var name=item.slice(pos+1,item.length);
    Create(){
        this.listIDTag=$(".js-data-example-ajaxTag").val();
        this.listIDContact=$(".js-data-example-ajaxContact").val();
        this.listIDTagDenied=$(".js-data-example-ajaxTagDenied").val();
        this.listIDContactDenied=$(".js-data-example-ajaxContactDenied").val();
        this.date=new Date(this.date);
        if(this.sendnow){
            this.date=new Date();
            this.Thoigiangui=this.date.toLocaleDateString('en-US')+' '+this.date.toLocaleTimeString();      
        }
        else if(this.sendlater){
            this.Thoigiangui=this.date.toLocaleDateString('en-US')+' '+this.hour+":"+this.minute+":00";
        }
        if(this.thoiHanDV=="Week"){
            this.date.setDate(this.date.getDate()+(7*this.thoiHannum));
        }
        if(this.thoiHanDV=="Day"){
            this.date.setDate(this.date.getDate()+parseInt(this.thoiHannum.toString()));
        }
        if(this.thoiHanDV=="Hour"){
            this.date.setDate(this.date.getDate());
            this.date.setHours(this.date.getHours()+parseInt(this.thoiHannum.toString()));
        }
        if(this.thoiHanDV=="Minute"){
            this.date.setDate(this.date.getDate());
            this.date.setMinutes(this.date.getMinutes()+parseInt(this.thoiHannum.toString()));
        }
        if(this.notifi==null){
            this.notifiID=1;
        }
        else{
            this.notifiID=this.notifi.NotifiID+1;
        }
        if(this.sendlater){
            this.ThoiHan=this.date.toLocaleDateString('en-US')+' '+this.hour+":"+this.minute+":00";
        }
        else{
            this.ThoiHan=this.date.toLocaleDateString('en-US')+' '+this.date.toLocaleTimeString(); 
        }
        if(this.tieude == undefined || this.Noidung == undefined || this.listIDTag==null || this.listIDContact==null)
        {
            console.log(false);
            return false;
        }
        else{
            this.getslsend({contact:this.listIDContact,tag:this.listIDTag,contactdenied:this.listIDContactDenied,tagdenied:this.listIDTagDenied}).then(result=>{
                this.notifi={AppID:this.AppID,
                NotifiID:this.notifiID,
                TieuDe:this.tieude,
                Noidung:this.Noidung,
                DoUuTien:this.doUuTien,
                Trangthai:this.Trangthai,
                Soluong:result,
                Thoigiangui:this.Thoigiangui,
                ThoiHan:this.ThoiHan,
                SendTag:this.listIDTag,
                SendTagName:this.listNameTag,
                SendUser:this.listIDContact,
                SendUserName:this.listNameContact,
                DeniedTag:this.listIDTagDenied,
                DeniedTagName:this.listNameTagDenied,
                DeniedUser:this.listIDContactDenied,
                DeniedUserName:this.listNameContactDenied};
                this.notifiservice.Create(this.notifi).then(result=>this._router.navigate(['confirm',this.notifi.NotifiID]));
            })
        }
    }


    loadGetAll() {
        this.appService.getApp().then( (result) => this.Apps = result);
    }
    getslsend(req):Promise<number>{
        return this.notifiservice.getslsend(req).then(result=>this.Soluong=result);
    }
    getCountContact(id: number):Promise<number> {
        return this.contactservice.getCount(id).then(result=>this.countContact=result);
    }
    ngOnInit(): void {
        this.loadGetAll();
        this.getNotifi();
        this.today=new Date();
        this.loophour=this.loop(1,24);
        this.loopminute=this.loop(0,60);
        this.loophourTH=this.loop(5,24);
        this.loopminuteTH=this.loop(5,60);
        this.loopdayTH=this.loop(5,28);
    }
    ngAfterViewInit()
    {		
        // this._route.queryParams.forEach((params: Params) => {
        //     let id = +params["id"];
        //     this.getCountContact(id).then(result=>{console.log(this.countContact)});
        // })
        // var count=this.countContact;
        jQuery(".js-data-example-ajaxTag").select2({
            placeholder:"Tag muốn gửi",
                multiple: true,
                allowClear: true, 
                tokenSeparators: [","],
                ajax: {
                    url: "/api/Tag",
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
                                    return { id: obj.TagID, text: obj.TagNameDisplay };
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
        jQuery(".js-data-example-ajaxTagDenied").select2({
            placeholder:"Tag không muốn gửi",
                multiple: true,
                allowClear: true, 
                tokenSeparators: [","],
                ajax: {
                    url: "/api/Tag",
                    dataType: 'json',
                    delay: 500,
                    data: function (params) {
                        return {
                            id: params.term, // search term
                            page: params.page,
                            };
                        },
                        processResults: function (data, params) {
                        var i=1;
                            params.page = params.page || 0;
                            return {
                                results:
                                $.map(data, function(obj) {
                                    i+=10;
                                    return { id: obj.TagID, text: obj.TagNameDisplay };
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
            jQuery(".js-data-example-ajaxContact").select2({
            placeholder:"User muốn gửi",
                multiple: true,
                allowClear: true, 
                tokenSeparators: [","],
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
                        var i=1;
                            params.page = params.page || 0;
                            return {
                                results:
                                $.map(data, function(obj) {
                                    i+=10;
                                    return { id: obj.ContactID, text: obj.ContactID+'.'+obj.TaiKhoan };
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
            jQuery(".js-data-example-ajaxContactDenied").select2({
            placeholder:"User không muốn gửi",
                multiple: true,
                allowClear: true, 
                tokenSeparators: [","],
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
                        var i=1;
                            params.page = params.page || 0;
                            return {
                                results:
                                $.map(data, function(obj) {
                                    i+=10;
                                    return { id: obj.ContactID, text: obj.ContactID+'.'+obj.TaiKhoan };
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
