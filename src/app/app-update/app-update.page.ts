import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { SettingsService } from '../services/settings-service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-app-update',
  templateUrl: './app-update.page.html',
  styleUrls: ['./app-update.page.scss'],
})
export class AppUpdatePage implements OnInit {
  versionNumber: string;
  versionNumberFromDB: string;
  constructor(
    private appVersion: AppVersion,
    private appUpdateDialog: AppRate,
    public settingsService: SettingsService,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.settingsService.getAppVersion().then((data: any) => {
      this.versionNumberFromDB = data.versionNum;
    });
    this.platform.ready().then(() => {
      this.appVersion.getVersionNumber().then(value => {
        this.versionNumber = value;
      }).catch(err => {
      });
    });
  }

  updateApp() {
    if (this.versionNumber !== this.versionNumberFromDB) {
      this.appUpdateDialog.navigateToAppStore();
    }
  }

}
