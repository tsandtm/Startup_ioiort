import { Component, Directive } from '@angular/core';
import { NgClass } from '@angular/common';
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
  Reports: Report[];
  filter: string;
  datasets = [];
  constructor(private reportService: ReportService) {

  }

  // loadGetAll() {
  //     // this.reportService.getDevice().then( (result) => this.Reports = result);

  // }
  loadGetAll() {
    this.reportService.getDevice().then((result) => {
      this.listDevice = result;

      this.barChartLabels = this.getmonthlabel();
      this.createDataSets();
      this.barChartData = this.datasets;
      console.log(JSON.stringify(this.getdatadonoughnut()))
      this.doughnutChartData = this.getdatadonoughnut();
      this.doughnutChartLabels = this.getlabeldonoughnut();
    });
  }

  private createDataSets() {
    this.listDevice.forEach(ld => {
      ld.listdevice.forEach(d => {
        let index = this.checkIfLabelExists(d.name);
        if (index === -1) {
          this.datasets.push({ data: [d.count], label: d.name });
        } else {
          this.datasets[index].data.push(d.count);
        }
      })
    })
  }


  checkIfLabelExists(label): number {
    if (this.datasets.length === 0)
      return -1;
    return this.datasets.findIndex(d => d.label === label);
  }

  getmonthlabel() {
    let a: string[] = [];
    this.listDevice.forEach(r => {
      //  console.log(JSON.stringify(r.date));
      a.push(r.date)
    })
    return a;
  }

  getlabeldonoughnut() {
    let a: string[] = [];
    this.datasets.forEach(r => {
      a.push(r.label)
    })
    return a;
  }
  getdatadonoughnut() {
    let a: number[] = [];
    this.datasets.forEach(r => {
      a.push(r.data)
    })
    return a;
  }


  ngOnInit(): void {
    this.loadGetAll();
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  // public barChartLabels:string[] = this.getdevicelabel();
  public barChartLabels: string[] = [];
  //  ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    { data: [], label: '' }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
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
  public doughnutChartLabels: string[] = [];
  //  ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string = 'doughnut';

  // // events
  // public chartClicked(e:any):void {
  //   console.log(e);
  // }

  // public chartHovered(e:any):void {
  //   console.log(e);
  // }
}

