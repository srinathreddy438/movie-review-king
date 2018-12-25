import { Component } from '@angular/core';

import { Platform, ActionSheetController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public actionsheetCtrl: ActionSheetController
  ) {
    this.initializeApp();
  }

  public appPages = [
    {
      title: 'Home',
      url: '/home-page',
      icon: 'home'
    },
    {
      title: 'Movies',
      url: '/movies',
      icon: 'list'
    },
    {
      title: 'Add Review',
      url: '/add-review',
      icon: 'create'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'person'
    }
  ];

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
