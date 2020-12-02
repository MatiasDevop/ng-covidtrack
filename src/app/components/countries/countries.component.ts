import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateWiseDate } from 'src/app/models/date-wise-data';
import { GlobalDataSummary } from 'src/app/models/global-Data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data : GlobalDataSummary[];
  countries : string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  selectedCountryData : DateWiseDate[];
  dateWiseData ;
  datatable = [];
  loading = true;
  chartColumns = ['Date', 'Cases'];
  title = 'Average Temperatures of Cities';
  chart = {
    PieChart : "PieChart" ,
    ColumnChart : 'ColumnChart' ,
    LineChart : "LineChart", 
    height: 500, 
    options: {
      height : 500, 
      animation:{
        duration: 1000,
        easing: 'out',
      },
    }
  }
  constructor(private service: DataServiceService) { }

  ngOnInit(): void {
    
    merge(
      this.service.getDataWiseData().pipe(
          map(result => {
            this.dateWiseData = result;
          })
      ),
      this.service.getGlobalData().pipe(
          map(result =>{
            this.data = result;
            this.data.forEach(cs => {
              this.countries.push(cs.country)
            })
          }))
      ).subscribe(
        {
          complete : () =>{
            this.updateValues('India');
            this.loading = false;
          }
        }
      )
  }

  updateChart(){
    this.datatable = [];
    //this.datatable.push([0 , 0]);
    this.selectedCountryData.forEach(cs => {
      this.datatable.push([cs.date , cs.cases])
    })
    console.log(this.selectedCountryData);
    console.log(this.datatable);
    
    
  }

  updateValues(country: string){
      this.data.forEach(cs =>{
        if(cs.country == country)
        {
          this.totalActive = cs.active
          this.totalDeaths = cs.deaths
          this.totalRecovered = cs.recovered
          this.totalConfirmed = cs.confirmed 
        }
      })

      this.selectedCountryData = this.dateWiseData[country];
      this.updateChart();
  }

}
