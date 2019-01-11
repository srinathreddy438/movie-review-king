import { Component, DoCheck, ChangeDetectorRef } from '@angular/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AccountsService } from './services/account-service';
import { LoaderService } from './shared/interceptor';
import { LoadingController } from '@ionic/angular';
import { AppRate } from '@ionic-native/app-rate/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public actionsheetCtrl: ActionSheetController,
    public accountsService: AccountsService,
    public loaderService: LoaderService,
    public loadingController: LoadingController,
    private cd: ChangeDetectorRef,
    private appRate: AppRate
  ) {
    /*if (this.loaderService.isLoading) {
    this.ref.detectChanges();
    }*/
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
      this.appRate.preferences = {
        storeAppURL: {
          ios: '<app_id>',
          android: 'market://details?id=com.svappzone.reviewking',
          windows: 'ms-windows-store://review/?ProductId=<store_id>'
        },
        customLocale: {
          title: 'Do You Enjoy?',
          message: 'Please Rate Us',
          cancelButtonLabel: 'No Thanks',
          laterButtonLabel: 'Remind me later',
          rateButtonLabel: 'Rate It Now',
        },
        callbacks: {
          onRateDialogShow: function (callback) {
            console.log('dfcsd');
          },
          onButtonClicked: function(buttonIndex) {
            console.log('Selected Index is ' + buttonIndex);
          }
        },
        simpleMode: true
      };
      /*this.appRate.preferences = {
        displayAppName: 'srinath reddy',
        usesUntilPrompt: 3,
        storeAppURL: {
          android: 'market://details?id=com.svappzone.reviewking'
        }
      };*/
    });

    if (this.accountsService && this.accountsService.getLoginInfo() && this.accountsService.getLoginInfo().userName === 'srinath440') {
      this.appPages = this.appPages.concat(this.adminPages);
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo'
    });
    return await loading.present();
  }

  public ngDoCheck(): void {
    this.cd.detectChanges();
  }

  rateApp() {
    this.appRate.promptForRating(true);
    /*this.platform.ready().then(() => {
      this.appRate.promptForRating(true);
    });*/
  }
}
