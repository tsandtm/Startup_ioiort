import { Component,OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Appkey } from './shared/app.model';
import { Notifi } from './shared/notifi.model';
import { AppService } from './shared/app.service';
import { NotifiService } from './shared/notifi.service';
//import {RlTagInputModule} from 'angular2-tag-input';
@Component({
    templateUrl: '/notification-send/notification.component.html',
    providers: [AppService,NotifiService]
})
export class NotifiSendComponent implements OnInit{
  public tags = ['Car', 'Bus', 'Train'];
  public autocompleteTags = [];
  public autocompleteItems = [
    'Banana',
    'Orange',
    'Apple',
    'Pear',
    'Grape',
    'Potato',
    'Peach'
  ];
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
    sendtag:number[]=[1];
    senduser:number[]=[1,2];
    deniedtag:number[];
    denieduser:number[];
    date:Date;
    hour:number=1;
    minute:number=1;
    loophour:number[];
    loopminute:number[];
    public pageTitle: string = 'Notification';
    constructor(private appService: AppService,
    private notifiservice:NotifiService,
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
    ngOnInit(): void {
        this.loadGetAll();
        this.getNotifi();
        this.loophour=this.loop(1,24);
        this.loopminute=this.loop(1,60);
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
    Create(){
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
        this.notifi={AppID:this.AppID,
        NotifiID:this.notifiID,
        TieuDe:this.tieude,
        Noidung:this.Noidung,
        DoUuTien:this.doUuTien,
        Trangthai:this.Trangthai,
        Soluong:1,
        Thoigiangui:this.Thoigiangui,
        ThoiHan:this.ThoiHan,
        SendTag:this.sendtag,
        SendUser:this.senduser,
        DeniedTag:this.deniedtag,
        DeniedUser:this.denieduser};
        this.notifiservice.Create(this.notifi).then(result=>this._router.navigate(['confirm',this.notifi.NotifiID]));
        //console.log("Created");
        //this._router.navigate(['confirm',this.notifi.NotifiID]);
    }


    loadGetAll() {
        this.appService.getApp().then( (result) => this.Apps = result);
    }
}
