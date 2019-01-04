import { Component } from '@angular/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AccountsService } from './services/account-service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public actionsheetCtrl: ActionSheetController,
    public accountsService: AccountsService
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
      title: 'Login',
      url: '/login',
      icon: 'person'
    }
  ];

  public adminPages = [
    {
      title: 'Add / Update Movie',
      url: '/add-movie',
      icon: 'create'
    }
  ];

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    if (this.accountsService && this.accountsService.getLoginInfo() && this.accountsService.getLoginInfo().userName === 'srinath440') {
      this.appPages = this.appPages.concat(this.adminPages);
    }
  }
}
