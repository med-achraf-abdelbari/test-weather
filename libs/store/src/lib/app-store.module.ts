import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesModule } from '@weather-app/services';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import { appEffect, appReducers } from './ngrx-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    CommonModule,
    ServicesModule,
    StoreDevtoolsModule.instrument({
      name: 'weather-app',
      maxAge: 25,
    }),
    StoreModule.forRoot(appReducers, {}),
    EffectsModule.forRoot(appEffect)
  ]
})
export class AppStoreModule {
}

