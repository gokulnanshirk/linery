import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private storage: Storage) { }
  createNewTrip(trip) {
    const operation = new Observable(observer => {

      this.storage.get('trips').then((data) => {
        if (data) {
          let newTrip = [...data, ...[trip]]
          this.storage.set('trips', newTrip).then(() => {
            observer.next('Saved')
          })
        }
        else {
          this.storage.set('trips', [trip]).then(() => {
            observer.next('Saved')
          })
        }
      })
    })
    return operation
  }
  getAllTrip() {
    const operation = new Observable(observer => {

      this.storage.get('trips').then((data) => {

        observer.next(data)

      })
    })
    return operation
  }
}
