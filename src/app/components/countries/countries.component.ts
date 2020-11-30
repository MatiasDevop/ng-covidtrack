import { Component, OnInit } from '@angular/core';
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
  dataTable = [];
 
  title = 'Average Temperatures of Cities';
  mytype = 'LineChart';
  columnNames = ["Date", "Cases"];
  options = {   
    hAxis: {
        title: 'Month'
    },
    vAxis:{
        title: 'Temperature'
    },
  };
  width = 550;
  height = 400;
  constructor(private service: DataServiceService) { }

  ngOnInit(): void {
    
    this.service.getDataWiseData().subscribe(
      (result) => {
        this.dateWiseData = result;
        this.updateChart();
        //console.log(result);
        
    })

    this.service.getGlobalData().subscribe(result =>{
      this.data = result;
      this.data.forEach(cs => {
        this.countries.push(cs.country)
      });
    })
  }

  updateChart(){
    let dataTable = [];
    dataTable.push(["Cases" , 'Date']);
    this.selectedCountryData.forEach(cs => {
      dataTable.push([cs.cases , cs.date])
    })
    console.log(this.selectedCountryData);
    
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
      //console.log(this.selectedCountryData);
      this.updateChart();
  }

}
