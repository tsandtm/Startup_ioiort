import { Component,Directive } from '@angular/core';
import{ NgClass }from '@angular/common';
import { ReportService } from '../Shared/Report.service';
import { Report } from '../Shared/Report.model';
// webpack html imports
@Component({
  selector: 'Report',
  templateUrl: '/Reports/Report/Report.component.html',  
  styleUrls: ['/assets/shop-homepage.css'],
   providers: [ReportService],
})

export class BarChartDemoComponent {
   Reports: Report[];
    filter: string;

    constructor(private reportService: ReportService) {
        
    }

    // loadGetAll() {
    //     // this.reportService.getDevice().then( (result) => this.Reports = result);
    
    // }
    loadGetAll() {
        this.reportService.getDevice().then( (result) => {
				this.Reports = result;
				this.barChartLabels = this.getmonthlabel();		
        this.barChartData = [{data:this.getcountdevice(),label:this.getnamedevice()},
        {data:this.getcountdevice(),label:this.getnamedevice()}] 
        this.doughnutChartLabels = this.getnamedevice();
        this.doughnutChartData = this.getcountdevice();
			});
    }

    getmonthlabel(){
      let a:string[]= [];
      this.Reports.forEach(r=>{
        a.push(r.date)
      })
      return a;
    }

     getcountdevice(){
      let a:number[]= [];
      
      this.Reports.forEach(r=>{
        a.push(r.count)      
      })
      console.log(a);
      return a;
    }

      getnamedevice(){
      let b:string[]= [];
      
      this.Reports.forEach(r=>{
        b.push(r.Device)      
      })
      console.log(b);
      return b;
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
    {data: [28, 48, 40], label: 'Series B'}
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
  public doughnutChartData:number[] = [350, 450];
  public doughnutChartType:string = 'doughnut';

  // // events
  // public chartClicked(e:any):void {
  //   console.log(e);
  // }

  // public chartHovered(e:any):void {
  //   console.log(e);
  // }
}
