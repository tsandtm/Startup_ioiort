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
  datasetsthangtr = [];
  datasetsthangnay = [];
  datasets = [];
  ArrayReport: Report[];
  devices = [];
  rp: Report;
  flag: number;
  flagtr: number;
  flagnay: number;
  isRunning = true;

  constructor(private reportService: ReportService) {

  }

  loadGetAll() {
    this.reportService.getAllDeviceforDougnut().then((result) => {
      this.Reports = result;
      this.devices = this.getlabeldonoughnut();    
    });
    this.reportService.getDevice().then((result) => {
      this.listDevice = [];
      this.listDevice = result;
      this.barChartLabels = this.getmonthlabel();
      this.createDataSets();
      this.barChartData = this.datasets;
    })
      .then((result) => {
        this.loadgetdougnut();
        
      });
  }
  loadgetdougnut() {
    this.reportService.getAllDeviceforDougnut().then((result) => {
      this.Reports = result;
      this.createDataSets();
      this.doughnutChartData = this.getdatadonoughnut();
      this.doughnutChartLabels = this.getlabeldonoughnut();
      this.gettotal();
      this.getpercent();
      this.isRunning = false;
    });
  }

  private createDataSets() {
    let e = [];
    let a = [];
    this.listDevice.forEach(ld => {
      console.log("so thiet bi" + this.devices.length + " so thiet bi moi thang " + ld.listdevice.length)
      e = [];
      console.log("mang e chay lai" + JSON.stringify(e))
      
        ld.listdevice.forEach(r => {
          e.push(r.name);
        });
      
      console.log("Mang e: " + JSON.stringify(e))
      for (let j = 0; j < ld.listdevice.length; j++) {
        console.log("devices trong vong for:" + JSON.stringify(this.devices))
        a = (this.devices).filter(function (j) {
          return e.indexOf(j) < 0;
        });
      }
      console.log("Mang a: " + JSON.stringify(a))
      if (a != []) {
        for (let i = 0; i < a.length; i++) {
          this.rp = new Report();
          this.rp.name = a[i];
          this.rp.count = 0;
          ld.listdevice.push(this.rp);
        }
      }
      // if (ld.listdevice.length < this.devices.length) {
      //   ld.listdevice.forEach(d => {

      //   })
      // }
      console.log("load tat ca" + JSON.stringify(ld));
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

  private createDataSetEach() {
    this.listDevice.forEach(ld => {
      if (ld.listdevice.length == 2) {
        console.log("có vo đay k ok")
        ld.listdevice.forEach(d => {
          console.log("do dai cua thiet bi :" + this.devices.length)
          for (let i = 0; i < this.devices.length; i++) {
            if (this.devices[i] != d.name) {
              this.rp = new Report();
              this.rp.name = this.devices[i];
              this.rp.count = 0;
              ld.listdevice.push(this.rp);
            }
          }
        })
      }
      console.log(JSON.stringify(ld));
      ld.listdevice.forEach(d => {
        let index = this.checkIfLabeltrcExists(d.name);
        if (index === -1) {
          this.datasetsthangtr.push({ data: [d.count], label: d.name });
        } else {
          this.datasetsthangtr[index].data.push(d.count);
        }
      })
    })
  }

  private createDataSetEachthangnay() {
    this.listDevice.forEach(ld => {
      if (ld.listdevice.length == 2) {
        ld.listdevice.forEach(d => {
          for (let i = 0; i < this.devices.length; i++) {
            if (this.devices[i] != d.name) {
              this.rp = new Report();
              this.rp.name = this.devices[i];
              this.rp.count = 0;
              ld.listdevice.push(this.rp);
            }
          }
        })
      }
      console.log(JSON.stringify(ld));
      ld.listdevice.forEach(d => {
        let index = this.checkIfLabelnayExists(d.name);
        if (index === -1) {
          this.datasetsthangnay.push({ data: [d.count], label: d.name });
        } else {
          this.datasetsthangnay[index].data.push(d.count);
        }
      })
      console.log("du lieu sau khi do" + JSON.stringify(ld));
    })
  }
  checkIfLabelExists(label): number {
    if (this.datasets.length === 0)
      return -1;
    return this.datasets.findIndex(d => d.label === label);
  }
  checkIfLabeltrcExists(label): number {
    if (this.datasetsthangtr.length === 0)
      return -1;
    return this.datasetsthangtr.findIndex(d => d.label === label);
  }
  checkIfLabelnayExists(label): number {
    if (this.datasetsthangnay.length === 0)
      return -1;
    return this.datasetsthangnay.findIndex(d => d.label === label);
  }

  getdatabymonth(id: number) {
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let my: string = month + ";" + year;

    if (id == 1) {
      month = date.getMonth();
      year = date.getFullYear();
      my = month + ";" + year;
      this.reportService.getDevicebydate(my).then((result) => {
        this.listDevice = result;
        if (this.listDevice.length == 0) {
          this.flagtr = 1;
          let date = new Date();
          let month = date.getMonth();
          this.barChartLabels = [];
          this.datasetsthangtr = [];

          this.barChartLabels.push("Tháng " + month.toString());
          if (this.flagtr == 1) {
            this.datasetsthangtr.push({ data: 0, label: "Không có dữ liệu" })
          }
          this.barChartData = this.datasetsthangtr;
        } else {
          this.barChartLabels = [];
          this.barChartLabels = this.getmonthlabel();
          this.barChartData = [];
          console.log("day la thang trc" + this.getmonthlabel());
          this.datasetsthangtr = [];
          this.createDataSetEach();
          console.log("Day la danh sach thang truoc" + JSON.stringify(this.datasetsthangtr));
          this.barChartData = this.datasetsthangtr;
        }
      }).catch((error) => {
        console.log("error");
      });
    }
    else if (id == 2) {
      month = date.getMonth() + 1;
      year = date.getFullYear();
      my = month + ";" + year;
      this.reportService.getDevicebydate(my).then((result) => {
        this.listDevice = result;
        console.log("flag:" + this.flag)
        if (this.listDevice.length == 0) {
          this.flag = 1;
          console.log("flag da doi:" + this.flag)
          let date = new Date();
          let month = date.getMonth() + 1;
          this.barChartLabels = [];
          this.datasetsthangnay = [];

          this.barChartLabels.push("Tháng " + month.toString());
          if (this.flag == 1) {
            this.datasetsthangnay.push({ data: 0, label: "Không có dữ liệu" })
          }
          this.barChartData = this.datasetsthangnay;
        } else {
          this.barChartLabels = [];
          this.barChartLabels = this.getmonthlabel();
          this.datasetsthangnay = [];
          this.createDataSetEachthangnay();
          this.barChartData = this.datasetsthangnay;
          console.log("dong data lay ra" + JSON.stringify(this.datasetsthangnay));
        }
      }).catch((error) => {
        console.log("error");
      });
    } else {
      this.reportService.getDevice().then((result) => {
        this.listDevice = [];
        this.listDevice = result;
        console.log("result nam nay:" + JSON.stringify(this.listDevice))
        this.barChartLabels = [];
        this.barChartLabels = this.getmonthlabel();
        this.datasets = [];
        this.createDataSets();
        console.log("dataset nam nay:" + JSON.stringify(this.datasets))
        this.barChartData = [];
        this.barChartData = this.datasets;
      });
    }
  }

  getmonthlabel() {
    let a: string[] = [];
    this.listDevice.forEach(r => {
      //  console.log(JSON.stringify(r.date));
      a.push("Tháng " + r.date)
    })
    return a;
  }

  getlabeldonoughnut() {
    let a: string[] = [];
    this.Reports.forEach(r => {
      a.push(r.name)
    })
    return a;
  }
  getdatadonoughnut() {
    let a: number[] = [];
    this.Reports.forEach(r => {
      a.push(r.count)
    })
    return a;
  }


  loadAllDeviceforDougnut(): Promise<Report[]> {
    return this.reportService.getAllDeviceforDougnut()
      .then((response) => {
        this.ArrayReport = response;
        return this.ArrayReport;
      })
      .catch((error) => {
        console.log(error)
        return error;
      });
  }

  testto: number = 0;
  a: number[] = [];
  b: string[] = [];
  c = [];

  gettotal() {
    this.loadAllDeviceforDougnut()
      .then(() => {
        for (let i = 0; i < this.ArrayReport.length; i++) {
          this.testto += parseInt(this.ArrayReport[i].count.toString());
        }
      });
  }
  getpercent() {
    let index;
    let flag = "";
    this.loadAllDeviceforDougnut()
      .then(() => {
        for (let i = 0; i < this.ArrayReport.length; i++) {
          if (flag != this.ArrayReport[i].name) {
            this.c[i] = Math.floor((parseInt(this.ArrayReport[i].count.toString()) / this.testto) * 100) + "%   " + "thiết bị " + this.ArrayReport[i].name;
          }
        }
      });
  }

  ngOnInit(): void {
    this.flag = 0;
    this.flagtr = 0;
    this.flagnay = 0;
    this.loadGetAll();
    // this.loadgetdougnut();
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

