import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit {
  trip
  labels
  constructor(private modalController: ModalController, private language: LanguageService) { }


  ngOnInit() {
    console.log(this.trip)
    this.language.getWordOf("tripDetail").subscribe((res) => {
      this.labels = res
    })
  }
  dismiss() {
    this.modalController.dismiss()
  }
  getFormattedDate(item) {
    return `${new Date(item).getDate()}-${new Date(item).getMonth() + 1}-${new Date(item).getFullYear()}`
  }
}
