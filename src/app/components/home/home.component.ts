import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-Data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData : GlobalDataSummary[];
  datatable = [];

  chart = {
    PieChart : "PieChart" ,
    ColumnChart : 'ColumnChart' ,
    LineChart : "LineChart", 
    height: 500, 
    options: {
      animation:{
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }  
  }
  // pieChart : GoogleChartInterface ={
  //   chartType: 'PieChart'
  // }
  // columnChart : GoogleChartInterface ={
  //   chartType: 'ColumnChart'
  // }
  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {

    this.dataService.getGlobalData()
      .subscribe(
        {
          next : (result) => {
            console.log(result);
            this.globalData = result;
            result.forEach(cs => {
              if(!Number.isNaN(cs.confirmed)){
                this.totalActive += cs.active
                this.totalConfirmed += cs.confirmed
                this.totalDeaths += cs.deaths
                this.totalRecovered += cs.recovered
              }
              
            })

            this.initChart('c');
          }
        }
      )
  }

  initChart(caseType : string){

    this.datatable = [];
    //this.datatable.push(["Country", "Cases"]);

    this.globalData.forEach(cs =>{
      let value :number ;
      if(caseType == 'c')
        if(cs.confirmed > 2000){
          value = cs.confirmed
        }
      if(caseType == 'a')
        if(cs.active > 2000){
          value = cs.deaths
        }
      if(caseType == 'd')
        if(cs.deaths > 1000){
          value = cs.deaths
        }
      if(caseType == 'r')
        if(cs.recovered > 2000){
          value = cs.recovered
        } 
      
        this.datatable.push([
          cs.country, value
        ])
    })

    console.log(this.datatable);
    // this.pieChart = {
    //   chartType: 'PieChart',
    //   dataTable: this.datatable,
    //   //firstRowIsData: true,
    //   options: {
    //     height : 500
    //   },
    // };

    // this.columnChart = {
    //   chartType: 'ColumnChart',
    //   dataTable: this.datatable,
    //   //firstRowIsData: true,
    //   options: {
    //     height : 500
    //   },
    // };

  }

  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value);
    
  }

}
