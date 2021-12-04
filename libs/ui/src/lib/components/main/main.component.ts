import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocationFacadeService } from '../../../../../store/src/lib/facades/location/location-facade.service';
import { WeatherFacadeService } from '../../../../../store/src/lib/facades/weather/weather-facade.service';

@Component({
  selector: 'weather-app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  filterForm = this.fb.group({
    cityName: ['', [Validators.required]],
    filterType: ['', []]
  });
  // There is an issue with weather api (response with hourly param has daily table and opposite for daily)
  periods = [{ label: 'Daily', value: 'hourly' }, { label: 'Hourly', value: 'daily' }];
  displayedColumns: string[] = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: any;
  activeLocation: any;

  constructor(private fb: FormBuilder, private locationFacade: LocationFacadeService, private weatherFacade : WeatherFacadeService) {
  }

  ngOnInit() {
    this.filterForm.valueChanges.subscribe((data) => {
      console.log(data);
    });
    this.weatherFacade.getActiveLocation().subscribe((data)=>{
      console.log(data);
    })
  }

  getCoordinates() {
    if (this.filterForm.get('cityName')?.value) {
      this.locationFacade.dispatchLocationByCityName(this.filterForm.get('cityName')?.value);
    }
    this.locationFacade.getActiveLocation().subscribe((data: any) => {
      this.activeLocation = data;
    });
  }

  getWeatherCast() {

    if (this.filterForm.valid && this.activeLocation) {
      this.weatherFacade.dispatchGetWeather({
        period : this.filterForm.get('filterType')?.value,
        long : this.activeLocation?.lon,
        lat : this.activeLocation?.lat
      });
    }
  }

  handleCityNotFound(){
    this.locationFacade.getLocationError().subscribe((err)=>{
      if(err){
        alert(err);
      }
    })
  }

  // addColumn() {
  //   const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
  //   this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  // }
  //
  // removeColumn() {
  //   if (this.columnsToDisplay.length) {
  //     this.columnsToDisplay.pop();
  //   }
  // }


}
