import { Component,Directive } from '@angular/core';
import{ NgClass }from '@angular/common';
import { ReportService } from '../Shared/Report.service';
import { ListDevice } from '../Shared/Report.model';
import { Report } from '../Shared/Report.model';
// webpack html imports
@Component({
  selector: 'Report',
  templateUrl: '/Reports/Report/Report.component.html',  
  styleUrls: ['/assets/shop-homepage.css'],
   providers: [ReportService],
})

export class BarChartDemoComponent {
   listDevice: ListDevice[];
   Reports:Report[];
    filter: string;

    constructor(private reportService: ReportService) {
        
    }

    // loadGetAll() {
    //     // this.reportService.getDevice().then( (result) => this.Reports = result);
    
    // }
    loadGetAll() {
        this.reportService.getDevice().then( (result) => {
				this.listDevice = result;      
				this.barChartLabels = this.getmonthlabel();		
        this.barChartData = [{data:this.getcountdevice(),label:this.getlistname()}]
         this.doughnutChartLabels = this.getlistname();
        this.doughnutChartData = this.getcountdevice();       
          
              this.doughnutChartLabels = this.getmonthlabel();
			});           
    }

    getmonthlabel(){
      let a:string[]=[];
      let flag= "";
      let i;
      this.listDevice.forEach(r=>{
        //  console.log(JSON.stringify(r.date));
        if(flag != r.date)
        {

          flag=r.date;
          a.push(r.date)        
        }
      }) 
      return a;
    }

    getlistname(){
      let b:Array<Report> = [];
      let c:string[] = [];
      this.listDevice.forEach(r=>{
        b = r.listdevice;
        b.forEach(result=>{
          c.push(result.name);
        })
      })
      return c;
    }

    getcountdevice(){
      let b:Array<Report> = [];
      let c:number[] = [];
      this.listDevice.forEach(r=>{
        b = r.listdevice;
         console.log(JSON.stringify(b));     
      })
      b.forEach(result=>{
          
           console.log("cccc"+JSON.stringify(result.count));
          c.push(result.count);
        })
        
      return c;
    }

    ngOnInit(): void {
        this.loadGetAll();
    }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  // public barChartLabels:string[] = this.getdevicelabel();
  public barChartLabels:string[] = [];
  //  ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
     {data: [], label: ''},
    {data: [], label: 'Series B'}
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  // Doughnut
  public doughnutChartLabels:string[] = [];
  //  ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  // // events
  // public chartClicked(e:any):void {
  //   console.log(e);
  // }

  // public chartHovered(e:any):void {
  //   console.log(e);
  // }
}

