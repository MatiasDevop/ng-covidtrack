import { Component, OnInit } from '@angular/core';
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

  constructor(private service: DataServiceService) { }

  ngOnInit(): void {

    this.service.getGlobalData().subscribe(result =>{
      this.data = result;
      this.data.forEach(cs => {
        this.countries.push(cs.country)
      });
    })
  }

}
