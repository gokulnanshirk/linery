import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss'],
})
export class TripFormComponent implements OnInit {
  vehicleRegNo
  driverName
  date: any = new Date().toISOString()
  fromLocation
  toLocation
  loadItem
  ton
  rent
  comission
  loadingCharge
  unloadingCharge
  startKm
  endKm
  totalFuel
  mielage
  labels: any
  constructor(private modalController: ModalController,
    private language: LanguageService,
    private trip: TripService
  ) { }

  ngOnInit() {
    this.getLangLabels()
  }
  dismiss(data?) {
    this.modalController.dismiss(data)
  }
  getLangLabels() {
    this.language.getWordOf('tripForm').subscribe((res: any) => {
      console.log(res)
      this.labels = res
    })
  }
  save() {
    if (this.validator()) {
      let newTrip = {
        vehicleRegNo: this.vehicleRegNo,
        driverName: this.driverName,
        date: this.date,
        fromLocation: this.fromLocation,
        toLocation: this.toLocation,
        loadItem: this.loadItem,
        ton: this.ton,
        rent: this.rent,
        comission: this.comission,
        loadingCharge: this.loadingCharge,
        unloadingCharge: this.unloadingCharge,
        startKm: this.startKm,
        endKm: this.endKm,
        totalFuel: this.totalFuel,
        mielage: this.mielage,
      }
      this.trip.createNewTrip(newTrip).subscribe((data) => {
        this.dismiss()
      })
    }
  }
  validator() {
    if (this.vehicleRegNo && this.fromLocation && this.toLocation) return true
    else return false
  }
}
