import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiModule } from '@weather-app/ui';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { appEffect, appReducers } from '../../../../libs/store/src/lib/ngrx-store';
import { EffectsModule } from '@ngrx/effects';
import { AppStoreModule } from '@weather-app/store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppStoreModule,
    RouterModule.forRoot([], {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled'
    }),
    StoreDevtoolsModule.instrument({
      name: 'weather-app',
      maxAge: 25,
    }),
    BrowserAnimationsModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
