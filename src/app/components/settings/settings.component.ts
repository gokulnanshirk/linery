import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(private language: LanguageService) { }
  logoutText: any
  selectedLanguage: any
  ngOnInit() {
    this.initialize()
  }
  initialize() {
    this.language.getWordOf('settings').subscribe((res: any) => {
      this.selectedLanguage = res.language
      this.logoutText = res.logout
    })
  }
  changeLanguage() {
    let i = this.language.selectLanguage()
  }

}
