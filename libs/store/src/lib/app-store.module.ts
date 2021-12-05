import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesModule } from '@weather-app/services';

@NgModule({
  imports: [
    CommonModule,
    ServicesModule
  ]
})
export class AppStoreModule {
}

