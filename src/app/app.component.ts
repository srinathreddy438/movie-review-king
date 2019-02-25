import { Component, DoCheck, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Platform, ActionSheetController, Nav } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AccountsService } from './services/account-service';
import { LoaderService } from './shared/interceptor';
import { LoadingController } from '@ionic/angular';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  @ViewChild(Nav) nav: Nav;
  /*appName: string;
  packageName: string;
  versionCode: string | number;
  versionNumber: string;*/

  constructor(
    public toastController: ToastController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public actionsheetCtrl: ActionSheetController,
    public accountsService: AccountsService,
    public loaderService: LoaderService,
    public loadingController: LoadingController,
    private cd: ChangeDetectorRef,
    private appRate: AppRate,
    private socialSharing: SocialSharing
  ) {
    /*if (this.loaderService.isLoading) {
    this.ref.detectChanges();
    }*/
    this.initializeApp();
  }
  public appPages = [
    // {
    //   title: 'Home',
    //   url: '/home-page',
    //   icon: 'home'
    // },
    {
      title: 'Now Showing Movies',
      url: '/movies/playing',
      icon: 'film'
    },
    {
      title: 'Upcoming Movies',
      url: '/movies/upcoming',
      icon: 'md-radio'
    },
    {
      title: 'Previous Movies',
      url: '/movies/previous',
      icon: 'play-circle'
    },
    {
      title: 'Trending Videos',
      url: '/trending-videos',
      icon: 'trending-up'
    },
    {
      title: 'Photos',
      url: '/photos',
      icon: 'images'
    },
    {
      title: 'App Update',
      url: '/app-update',
      icon: 'cloud-done'
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
    },
    {
      title: 'Add / Update Trending Videos',
      url: '/create-trending-videos',
      icon: 'create'
    },
    {
      title: 'Add / Update Photos',
      url: '/create-photos',
      icon: 'create'
    }
  ];
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      document.addEventListener('backbutton', () => {
        if (location.href.indexOf('home-page') !== -1) {
          // const msg = 'Press again to exit app';
          // this.presentToastWithOptions(msg);
          interface NavigatorCordova extends Navigator {
            app: {
              exitApp: () => any;
            };
          }
          (navigator as NavigatorCordova).app.exitApp();
        }
      });
      // https://www.freakyjolly.com/ionic-4-get-app-version-name-version-code-and-package-name-using-ionic-native-plugin/
      /*this.appVersion.getAppName().then(value => {
        this.appName = value;
      }).catch(err => {
      });
      this.appVersion.getPackageName().then(value => {
        this.packageName = value;
      }).catch(err => {
      });
      this.appVersion.getVersionCode().then(value => {
        this.versionCode = value;
        if (this.versionCode !== 3) {
          const updateUrl = 'https://moviesreviewapp.herokuapp.com/update/update.xml';
          this.appUpdate.checkAppUpdate(updateUrl).then(() => {
            alert('Update available');
          }).catch(err => {
          });
        }
      }).catch(err => {
      });
      this.appVersion.getVersionNumber().then(value => {
        this.versionNumber = value;
      }).catch(err => {
      });*/

    });

    if (this.accountsService && this.accountsService.getLoginInfo() && this.accountsService.getLoginInfo().userName === 'srinath440') {
      this.appPages = this.appPages.concat(this.adminPages);
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
    });
    return await loading.present();
  }

  async presentToastWithOptions(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  public ngDoCheck(): void {
    this.cd.detectChanges();
  }

  rateApp() {
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
        onButtonClicked: function (buttonIndex) {
          console.log('Selected Index is ' + buttonIndex);
        }
      },
      simpleMode: true
    };
    this.appRate.promptForRating(true);
  }

  shareApp(network) {
    if (network === 'whatsapp') {
      this.socialSharing.shareViaWhatsApp(
        'Hello Please install Movie Review King app',
        '',
        'https://play.google.com/store/apps/details?id=com.svappzone.reviewking'
      );
    }
    if (network === 'facebook') {
      this.socialSharing.shareViaFacebook(
        'Hello Please install Movie Review King app',
        '',
        'https://play.google.com/store/apps/details?id=com.svappzone.reviewking'
      );
    }
    if (network === 'twitter') {
      this.socialSharing.shareViaTwitter(
        'Hello Please install Movie Review King app',
        '',
        'https://play.google.com/store/apps/details?id=com.svappzone.reviewking'
      );
    }
  }
}
