import { Component, DoCheck, ChangeDetectorRef } from '@angular/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AccountsService } from './services/account-service';
import { LoaderService } from './shared/interceptor';
import { LoadingController } from '@ionic/angular';
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
    private cd: ChangeDetectorRef
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
}
