import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocationFacadeService } from '../../../../../store/src/lib/facades/location/location-facade.service';
import { WeatherFacadeService } from '../../../../../store/src/lib/facades/weather/weather-facade.service';
import { week } from '../../constants/days';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'weather-app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  filterForm = this.fb.group({
    cityName: [null, [Validators.required]],
    filterType: [null, [Validators.required]]
  });
  // There is an issue with weather api (response with hourly param has daily table and opposite for daily)
  periods = [{ label: 'Daily', value: 'hourly' }, { label: 'Hourly', value: 'daily' }];
  displayedColumns!: string[];
  columnsToDisplay!: string[];
  data: any;
  activeLocation: any;

  constructor(private fb: FormBuilder,
              private locationFacade: LocationFacadeService,
              private weatherFacade: WeatherFacadeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getCoordinates();
    this.getWeatherCast();
    this.handleQueryParams();
  }

  getCoordinates() {
    this.locationFacade.getActiveLocation().subscribe((data: any) => {
      this.activeLocation = data;
      this.dispatchGetWeatherCast();
    });
    this.locationFacade.getLocationError().subscribe((err) => {
      if (err) {
        this.resetData();
      }
    });
  }

  handleQueryParams() {
    this.filterForm.valueChanges.subscribe((filterData)=>{
      const queryParams: Params = filterData;
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: queryParams,
          queryParamsHandling: 'merge', // remove to replace all query params by provided
        });
    })
    this.route.queryParams.subscribe((params:any) => {
      console.log(params);
      if(params){
        for (const param in params){
          this.filterForm.controls[param].setValue(params[param]);
        }
        if(this.filterForm.get('cityName')!.valid){
          this.triggerGetCoordinates();
        }
      }
      console.log(this.filterForm);
    });
  }

  getWeatherCast() {
    this.weatherFacade.getActiveLocation().subscribe((data) => {
      if (data) {
        // check API  data (should return 24 )
        // daily and hourly filter params in api are in reverse
        if (this.filterForm.get('filterType')?.value !== 'hourly') {
          this.handleDataHourly(data);
        } else {
          this.handleDataDaily(data);
        }
      }
    });
  }

  handleDataHourly(data: any) {
    const weatherData = this.sliceArray(data.hourly.slice(0, 23), 3).map((step: any[]) => {
      // return step.map(weather => weather.temp).reduce((previousValue, currentValue) => (previousValue + currentValue) / 3).toFixed(0);
      return step.map(weather => weather.temp)[0]
    });
    let tableData: any = {};
    this.displayedColumns = [];
    weatherData.forEach((temp, index) => {
      this.displayedColumns.push(`Temperature : ${index + 1}`);
      tableData[`Temperature : ${index + 1}`] = temp;
    });
    this.setTableData(tableData);
  }

  handleDataDaily(data: any) {
    const weatherData: any = data.daily.slice(0, 6).map((day: any) => day.temp.day);
    let tableData: any = {};
    this.displayedColumns = [];
    weatherData.forEach((temp: any, index: number) => {
      this.displayedColumns.push(week[index]);
      tableData[week[index]] = temp;
    });
    this.setTableData(tableData);
  }

  setTableData(weatherData: any) {
    this.displayedColumns.unshift('city');
    this.columnsToDisplay = this.displayedColumns.slice();
    this.data = [{ ...weatherData, city: this.activeLocation.name }];
  }

  sliceArray(array: any, step: number) {
    let start = 0;
    let end = start + step;
    let result = [];
    for (let i = 0; i < array.length / step; i++) {
      const avg = array.slice(start, end);
      start = end;
      end = end + step;
      result.push(avg);
    }
    return result;
  }

  triggerGetCoordinates() {
    if (this.filterForm.get('cityName')?.value) {
      this.locationFacade.dispatchLocationByCityName(this.filterForm.get('cityName')?.value.trim());
    }
  }

  dispatchGetWeatherCast() {
    if (this.filterForm.valid && this.activeLocation) {
      this.weatherFacade.dispatchGetWeather({
        period: this.filterForm.get('filterType')?.value,
        long: this.activeLocation?.lon,
        lat: this.activeLocation?.lat
      });
    }
  }

  resetData() {
    alert('No city found , please try again!');
    this.data = null;
    this.filterForm.get('filterType')?.setValue(null);
    this.locationFacade.dispatchClearLocationError();
  }


}
