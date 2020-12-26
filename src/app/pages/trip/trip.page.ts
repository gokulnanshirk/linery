import { Component, OnInit } from '@angular/core';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { ModalController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { TripDetailComponent } from 'src/app/components/trip-detail/trip-detail.component';
import { TripFormComponent } from 'src/app/components/trip-form/trip-form.component';
import { LanguageService } from 'src/app/services/language.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {

  payeeVPA: string;
  payeeName: string;
  transactionNote: string = 'Payment for Groceries';
  payAmount: number;
  currency: string = 'INR';
  transactionReference: string;


  searchbarPlaceholder: any
  list: any
  constructor(
    private language: LanguageService,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private storage: Storage,
    private trip: TripService,
    private webIntent: WebIntent
  ) { }

  ngOnInit() {
    // this.storage.clear()
    this.initialize()
  }
  initialize() {

    this.getAllTrip()

    this.language.getWordOf('tripPage').subscribe((res) => {
      this.searchbarPlaceholder = res.placeholder
    })
  }
  async openSettings(event?) {
    const popover = await this.popoverController.create({
      component: SettingsComponent,
      event: event,
      translucent: true,
      mode: 'ios'
    });

    popover.style.setProperty('--backdrop-opacity', '0.7')
    popover.onWillDismiss().then((data) => {
      this.initialize()
    })
    return await popover.present();
  }

  async tripForm() {
    const model = await this.modalController.create({
      component: TripFormComponent,
      mode: 'ios'
    });

    model.onWillDismiss().then((data) => {
      this.getAllTrip()
    })

    return await model.present();
  }

  getAllTrip() {
    this.trip.getAllTrip().subscribe(data => {
      this.list = data
      console.log(data)
    })
  }
  getFormattedDate(item) {
    return `${new Date(item).getDate()}-${new Date(item).getMonth() + 1}-${new Date(item).getFullYear()}`
  }
  async viewTrip(trip) {
    const model = await this.modalController.create({
      component: TripDetailComponent,
      mode: 'ios',
      componentProps: {
        trip
      }
    });

    model.onWillDismiss().then(() => {

    })

    return await model.present();
  }
  pay() {

    this.payeeVPA = '7339082285@ybl';
    this.payeeName = 'Monika%20Anandhan';
    this.payAmount = 20;
    this.transactionReference = '#87148172'; //ORDER ID or Something similar

    const url = 'upi://pay?pa=' + this.payeeVPA + '&pn=' + this.payeeName + '&tr=' + this.transactionReference + 'tn=' + this.transactionNote + '&am=' + this.payAmount + '&cu=' + this.currency;
    const options = {
      action: this.webIntent.ACTION_VIEW,
      url
    };
    this.webIntent.startActivityForResult(options).then(success => {
      console.log(success);
      if(success.extras.Status == 'SUCCESS') {
        // SUCCESS RESPONSE
      } else if(success.extras.Status == 'SUBMITTED') {
        // SUBMITTED RESPONSE
      } else if(success.extras.Status == 'Failed' || success.extras.Status == 'FAILURE') {
        // FAILED RESPONSE
      } else {
        // FAILED RESPONSE
      }
    }, error => {
      console.log(error);
    });
  }
}
