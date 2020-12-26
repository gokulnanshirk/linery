import { Injectable } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  prefferedLanguage: any
  constructor(
    private alertController: AlertController,
    private storage: Storage,
    private translate: TranslateService,
    private popover: PopoverController
  ) {
  }

  async selectLanguage(ev?) {

    const alert = await this.alertController.create({
      // header: 'Language Setup!',
      message: 'Select your preffered language <br><br> உங்களது மொழி ஐ தேர்ந்தெடுங்கள்',
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: 'English',
          handler: (data) => {
            this.setPrefferedLanguage('english')
          }
        },
        {
          text: 'தமிழ்',
          handler: (data) => {
            this.setPrefferedLanguage('tamil')
          }
        }
      ]
    });

    return alert.present();

  }
  check() {
    this.storage.get('prefferedLaguage').then((lang: any) => {
      if (lang) {
        this.prefferedLanguage = lang
        this.translate.use(lang)
      }
      else {
        this.selectLanguage()
      }
    })
  }

  setPrefferedLanguage(lang) {
    this.translate.use(lang)
    this.translate.setDefaultLang(lang)
    this.prefferedLanguage = lang
    this.storage.set('prefferedLaguage', lang).then(() => {
      this.popover.dismiss()
      console.log('Language have beed set to', lang)
    })
  }

  getPrefferedLanguage() {
    return this.prefferedLanguage
  }

  getWordOf(word) {
    return this.translate.get(word)
  }

}
