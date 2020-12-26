import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripPageRoutingModule } from './trip-routing.module';

import { TripPage } from './trip.page';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { TripFormComponent } from 'src/app/components/trip-form/trip-form.component';
import { TripDetailComponent } from 'src/app/components/trip-detail/trip-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripPageRoutingModule
  ],
  declarations: [TripPage, SettingsComponent, TripFormComponent, TripDetailComponent],
  entryComponents: [SettingsComponent, TripFormComponent, TripDetailComponent]
})
export class TripPageModule { }
